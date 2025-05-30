/* eslint-disable no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import fs from 'fs-extra';
import path from 'path';
import * as postcss from 'postcss';
import { parse } from 'postcss-values-parser';
import { camelCase, kebabCase, capitalize } from 'lodash';
import { getComponentMetaInfos } from '../utils/lcap';
import type {
  LcapBuildOptions, CSSValue, CSSRule, SupportedCSSProperty, FinalComponentCSSInfo,
  DepComponent,
} from './types';

function sortMap(map: Record<string, any>) {
  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
}

function getChildrenValue(val: Record<string, any>) {
  return val.nodes.map((node) => node.toString());
}

function startsWithPrefix(hideSelectorPrefixes: Array<string>, selectorKey: string) {
  return hideSelectorPrefixes.some((selectorPrefix) => selectorKey.startsWith(selectorPrefix) || selectorKey.startsWith(`[class*=${selectorPrefix}`));
}

interface ComponentCSSInfo {
  cssRules: CSSRule[],
  cssRuleMap: Map<string, CSSRule>,
  mainSelectorMap: Map<string, boolean>,
}

function parseCSSInfo(
  cssContent: string,
  cssRulesDesc: Record<string, Record<string, string>>,
  componentNameMap: Record<string, string | undefined>,
  options: LcapBuildOptions,
) {
  const componentNames = Object.keys(componentNameMap);
  const allCSSDescMap = Object.values(cssRulesDesc).reduce((acc, item) => Object.assign(acc, item), {});

  const root = postcss.parse(cssContent);

  const hasPesudoClassRE = /:(hover|active|focus)/;
  const hasPesudoStateRE = /(:|\._)(hover|active|focus)/;
  const isNonStandardRE = /-(moz|webkit|ms|o)-/;
  const hasPesudoElementRE = /::|:(before|after|selection)/;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)___[a-zA-Z0-9-]{6,}/;
  const warningIgnoreRE = new RegExp((options.reportCSSInfo?.warningIgnore || [/%/]).map((re) => re.source).join('|'));

  function getPrefixMap(componentName: string, parentName: string | undefined) {
    const firstPrefix = kebabCase(componentName);
    const prefixMap = { [firstPrefix]: true };
    const proRE = /^el-(.+)-pro$/;
    if (proRE.test(firstPrefix)) prefixMap[firstPrefix.replace(proRE, 'el-p-$1')] = true;
    const vanRE = /^van-/;
    if (vanRE.test(firstPrefix)) prefixMap[firstPrefix.replace(vanRE, '')] = true;
    if (parentName) {
      const parentPrefix = kebabCase(parentName);
      if (firstPrefix.startsWith(parentPrefix)) {
        const comboPrefix = `${parentPrefix}_${firstPrefix.slice(parentPrefix.length + 1)}`; // u-form_item
        prefixMap[comboPrefix] = true;
      } if (firstPrefix.replace(/-multi$/, '').startsWith(parentPrefix.replace(/-multi$/, ''))) {
        const comboPrefix = `${parentPrefix}_${firstPrefix.replace(/-multi$/, '').slice(parentPrefix.replace(/-multi$/, '').length + 1)}`; // u-navar-multi_item
        prefixMap[comboPrefix] = true;
      } else {
        const start = firstPrefix.match(/^(.+?)-/)?.[1];
        if (start) {
          const comboPrefix = `${parentPrefix}_${firstPrefix.slice(start.length + 1)}`; // u-radios_radio
          prefixMap[comboPrefix] = true;
        }
      }
    }

    const selectorPrefixMap = options.reportCSSInfo?.extraComponentMap?.[componentName]?.selectorPrefixMap;
    selectorPrefixMap && Object.assign(prefixMap, selectorPrefixMap);

    return prefixMap;
  }

  // eslint-disable-next-line no-shadow
  const inferSelectorComponentName = options.reportCSSInfo?.inferSelectorComponentName || ((selector: string, componentNameMap: Record<string, string | undefined>) => {
    return Object.keys(componentNameMap).find((componentName) => {
      const prefixMap = getPrefixMap(componentName, componentNameMap[componentName]);

      const re = new RegExp(Object.keys(prefixMap).map((prefix) => `^\\.${prefix}(__|--|$|[ +>~\\.:\\[])|^\\[class\\*=${prefix}_`).join('|'));
      return re.test(selector);
    });
  });

  function getMainSubSelector(subSelector: string) {
    const cap = subSelector.slice(1).match(/[[.:]/);
    let result = cap ? subSelector.slice(0, (cap.index
      || subSelector.length - 1 // 支持 *:last-child 等选择器
    ) + 1) : subSelector;

    if (hasPesudoStateRE.test(result)) result = result.replace(new RegExp(hasPesudoStateRE, 'g'), '');

    return result;
  }

  const isSelectorStartRoot = options.reportCSSInfo?.isSelectorStartRoot || ((selector: string, componentName: string, parentName: string | undefined) => {
    const prefixMap = getPrefixMap(componentName, componentNameMap[componentName]);

    const notRootPrefixes: string[] = [];
    const rootPrefixes: string[] = [];
    Object.entries(prefixMap).forEach(([prefix, isRoot]) => {
      (isRoot ? rootPrefixes : notRootPrefixes).push(prefix);
    });

    let re = new RegExp(notRootPrefixes.map((prefix) => `^\\.${prefix}(--|$|[ +>~\\.:])|^\\[class\\*=${prefix}___`).join('|'));
    if (notRootPrefixes.length && re.test(selector)) return false;
    re = new RegExp(rootPrefixes.map((prefix) => `^\\.${prefix}(--|$|[ +>~\\.:])|^\\[class\\*=${prefix}___`).join('|'));
    return !!rootPrefixes.length && re.test(selector);
  });

  const componentCSSInfoMap: Record<string, ComponentCSSInfo> = {};

  /** 目前只是用来减少 WARN 日志 */
  const allMainSelectorMap = !options.reportCSSInfo?.extraComponentMap ? {} : Object.keys(options.reportCSSInfo?.extraComponentMap).reduce((obj, componentName) => {
    const mainSelectorMap = options.reportCSSInfo?.extraComponentMap?.[componentName]?.mainSelectorMap;
    return { ...obj, ...mainSelectorMap };
  }, {} as Record<string, boolean>);

  root.nodes.forEach((node) => {
    if (node.type === 'rule') {
      if (/\([^(),]+?(,[^(),]+?)+\)/.test(node.selector)) return; // 过滤掉含有逗号()的选择器

      let selectors = node.selector
        .replace(/\s+/g, ' ') // 抹平换行符
        .replace(/\s*([>+~,])\s*/g, '$1') // 统一去除空格
        .split(/,/g)
        .flatMap((sel) => (hasPesudoClassRE.test(sel) && !hasPesudoElementRE.test(sel) ? [sel, sel.replace(new RegExp(hasPesudoClassRE, 'g'), '._$1')] : [sel])); // 增加模拟伪类

      let selector = selectors.join(',');
      if (/:(before|after)$|vusion|s-empty|_fake|_empty|[dD]esigner|cw-style/.test(selector) || isNonStandardRE.test(selector)) return;
      node.selector = selector; // 更新 CSS 代码中的选择器

      selectors = selectors
        // .filter((sel) => !/|ms|o)-|^_/.test(sel)) // 过滤掉浏览器前缀和 _ 开头的选择器
        .map((sel) => sel.replace(new RegExp(hashClassRE, 'g'), '[class*=$1___]')); // hash 类名改为 [class*=] 属性选择器
      selector = selectors.join(',');
      if (!selector) return;

      const componentName = inferSelectorComponentName?.(selector, componentNameMap);
      if (!componentName) {
        if (options.reportCSSInfo?.verbose) {
          const tempComponentName = componentNames.find((name) => {
            name = kebabCase(name);
            return new RegExp(`^\\.${name}(_|-)|^\\[class\\*=${name}(_|-)`).test(selector) && !/:(before|after)$/.test(selector);
          });
          if (tempComponentName && allMainSelectorMap[selector] === undefined && !warningIgnoreRE.test(selector)) console.warn(`[WARN] 未找到可能的组件选择器: ${selector}，按照_|-分割推测可能的组件：${tempComponentName}`);
          const tempComponentName2 = componentNames.find((name) => {
            name = kebabCase(name);
            return new RegExp(`^\\.${name}|^\\[class\\*=${name}`).test(selector) && !/:(before|after)$/.test(selector);
          });
          if (!tempComponentName && tempComponentName2 && allMainSelectorMap[selector] === undefined
            && !warningIgnoreRE.test(selector)) console.warn(`[WARN] 未找到可能的组件选择器: ${selector}，根据前缀连续推测可能的组件：${tempComponentName2}`);
        }
        return;
      }

      const componentCSSInfo = componentCSSInfoMap[componentName] = componentCSSInfoMap[componentName] || {
        cssRules: [],
        cssRuleMap: new Map(),
        mainSelectorMap: new Map(),
      };

      selectors.forEach((sel) => {
        let mainSelector = '';
        const re = /[ +>~]/g;
        let cap;
        let lastIndex = 0;
        while ((cap = re.exec(sel))) {
          mainSelector += getMainSubSelector(sel.slice(lastIndex, cap.index)) + cap[0];
          lastIndex = cap.index + 1;
        }
        mainSelector += getMainSubSelector(sel.slice(lastIndex));
        if (mainSelector.endsWith(' *') || mainSelector.endsWith('>*')
          || mainSelector.endsWith('(') // 临时过滤 :not( 错误的选择器
        ) return;

        componentCSSInfo.mainSelectorMap.set(mainSelector, isSelectorStartRoot(mainSelector, componentName, componentNameMap[componentName]));
      });

      const parsedStyle: Record<SupportedCSSProperty, CSSValue> = {} as Record<SupportedCSSProperty, CSSValue>;
      node.nodes.forEach((decl) => {
        if (decl.type === 'comment') return;
        if (decl.type !== 'decl') return;
        if (decl.prop.startsWith('--')) return;

        const value = decl.value.replace(/var\(.+?\)/g, (m) => m.replace(/\s+/g, ''));
        let match;
        const patchImportant = (obj: { defaultValue: string }) => ({ ...obj, important: decl.important });
        if (decl.prop === 'background') {
          parsedStyle.backgroundColor = patchImportant({ defaultValue: decl.value });
        } else if (decl.prop === 'border') {
          if (value === undefined || value === null) return;
          const parseVal = parse(value);
          const arr = getChildrenValue(parseVal);
          // const arr = value.split(/\s+/);
          if (arr.length < 3) return;
          const [borderWidth, borderStyle, borderColor] = arr;
          parsedStyle.borderLeftWidth = patchImportant({ defaultValue: borderWidth });
          parsedStyle.borderLeftStyle = patchImportant({ defaultValue: borderStyle });
          parsedStyle.borderLeftColor = patchImportant({ defaultValue: borderColor });
          parsedStyle.borderRightWidth = patchImportant({ defaultValue: borderWidth });
          parsedStyle.borderRightStyle = patchImportant({ defaultValue: borderStyle });
          parsedStyle.borderRightColor = patchImportant({ defaultValue: borderColor });
          parsedStyle.borderTopWidth = patchImportant({ defaultValue: borderWidth });
          parsedStyle.borderTopStyle = patchImportant({ defaultValue: borderStyle });
          parsedStyle.borderTopColor = patchImportant({ defaultValue: borderColor });
          parsedStyle.borderBottomWidth = patchImportant({ defaultValue: borderWidth });
          parsedStyle.borderBottomStyle = patchImportant({ defaultValue: borderStyle });
          parsedStyle.borderBottomColor = patchImportant({ defaultValue: borderColor });
        } else if (
          (match = decl.prop.match(/^border-(left|right|top|bottom)$/))
        ) {
          const borderProp = match[1];
          if (value === undefined || value === null) return;
          const parseVal = parse(value);
          const arr = getChildrenValue(parseVal);
          // const arr = value.split(/\s+/);
          if (arr.length < 3) return;
          const [borderWidth, borderStyle, borderColor] = arr;
          parsedStyle[`border${capitalize(borderProp)}Width`] = patchImportant({ defaultValue: borderWidth });
          parsedStyle[`border${capitalize(borderProp)}Style`] = patchImportant({ defaultValue: borderStyle });
          parsedStyle[`border${capitalize(borderProp)}Color`] = patchImportant({ defaultValue: borderColor });
        } else if (decl.prop === 'margin') {
          if (value === undefined || value === null) return;
          const parseVal = parse(value);
          const arr = getChildrenValue(parseVal);
          // const arr = value.split(/\s+/);
          if (arr.length === 1) {
            parsedStyle.marginTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginRight = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginBottom = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginLeft = patchImportant({ defaultValue: arr[0] });
          } else if (arr.length === 2) {
            parsedStyle.marginTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.marginBottom = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginLeft = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 3) {
            parsedStyle.marginTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.marginBottom = patchImportant({ defaultValue: arr[2] });
            parsedStyle.marginLeft = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 4) {
            parsedStyle.marginTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.marginRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.marginBottom = patchImportant({ defaultValue: arr[2] });
            parsedStyle.marginLeft = patchImportant({ defaultValue: arr[3] });
          }
        } else if (decl.prop === 'padding') {
          if (value === undefined || value === null) return;
          const parseVal = parse(value);
          const arr = getChildrenValue(parseVal);
          // const arr = value.split(/\s+/);
          if (arr.length === 1) {
            parsedStyle.paddingTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingRight = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingBottom = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingLeft = patchImportant({ defaultValue: arr[0] });
          } else if (arr.length === 2) {
            parsedStyle.paddingTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.paddingBottom = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingLeft = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 3) {
            parsedStyle.paddingTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.paddingBottom = patchImportant({ defaultValue: arr[2] });
            parsedStyle.paddingLeft = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 4) {
            parsedStyle.paddingTop = patchImportant({ defaultValue: arr[0] });
            parsedStyle.paddingRight = patchImportant({ defaultValue: arr[1] });
            parsedStyle.paddingBottom = patchImportant({ defaultValue: arr[2] });
            parsedStyle.paddingLeft = patchImportant({ defaultValue: arr[3] });
          }
        } else if (decl.prop === 'border-radius') {
          if (value === undefined || value === null) return;
          const parseVal = parse(value);
          const arr = getChildrenValue(parseVal);
          // const arr = value.split(/\s+/);
          if (arr.length === 1) {
            parsedStyle.borderTopLeftRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderTopRightRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderBottomRightRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderBottomLeftRadius = patchImportant({ defaultValue: arr[0] });
          } else if (arr.length === 2) {
            parsedStyle.borderTopLeftRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderTopRightRadius = patchImportant({ defaultValue: arr[1] });
            parsedStyle.borderBottomRightRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderBottomLeftRadius = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 3) {
            parsedStyle.borderTopLeftRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderTopRightRadius = patchImportant({ defaultValue: arr[1] });
            parsedStyle.borderBottomRightRadius = patchImportant({ defaultValue: arr[2] });
            parsedStyle.borderBottomLeftRadius = patchImportant({ defaultValue: arr[1] });
          } else if (arr.length === 4) {
            parsedStyle.borderTopLeftRadius = patchImportant({ defaultValue: arr[0] });
            parsedStyle.borderTopRightRadius = patchImportant({ defaultValue: arr[1] });
            parsedStyle.borderBottomRightRadius = patchImportant({ defaultValue: arr[2] });
            parsedStyle.borderBottomLeftRadius = patchImportant({ defaultValue: arr[3] });
          }
        } else {
          parsedStyle[camelCase(decl.prop)] = patchImportant({ defaultValue: decl.value });
        }
      });
      const cssRule: CSSRule = {
        selector,
        isStartRoot: isSelectorStartRoot(selector, componentName, componentNameMap[componentName]),
        description: '', // cssRuleSelectors[selector] || lastRuleDesc || '',
        // code: node.toString().replace(/^[\s\S]*?\{/, '{'),
        parsedStyle,
      };

      if (componentCSSInfo.cssRuleMap.has(selector)) {
        const oldParsedStyle = componentCSSInfo.cssRuleMap.get(selector)?.parsedStyle as Record<SupportedCSSProperty, CSSValue>;
        (Object.keys(parsedStyle) as SupportedCSSProperty[]).forEach((prop) => {
          if (oldParsedStyle[prop]?.important && !parsedStyle[prop].important) {
            parsedStyle[prop] = oldParsedStyle[prop];
          }
        });
        Object.assign(oldParsedStyle, parsedStyle);
      } else {
        componentCSSInfo.cssRules.push(cssRule);
        componentCSSInfo.cssRuleMap.set(selector, cssRule);
      }
    }
  });

  componentNames.forEach((componentName) => {
    let componentCSSInfo = componentCSSInfoMap[componentName];
    const optMainSelectorMap = options.reportCSSInfo?.extraComponentMap?.[componentName]?.mainSelectorMap;
    if (optMainSelectorMap) {
      if (!componentCSSInfo) {
        componentCSSInfo = componentCSSInfoMap[componentName] = {
          cssRules: [],
          cssRuleMap: new Map(),
          mainSelectorMap: new Map(),
        };
      }
      Object.entries(optMainSelectorMap).forEach(([sel, value]) => {
        componentCSSInfo.mainSelectorMap.set(sel, value);
      });
    }
    if (!componentCSSInfo) return;

    // eslint-disable-next-line no-restricted-syntax
    for (const mainSelector of componentCSSInfo.mainSelectorMap.keys()) {
      if (!componentCSSInfo.cssRuleMap.has(mainSelector)) {
        const cssRule: CSSRule = {
          selector: mainSelector,
          isStartRoot: componentCSSInfo.mainSelectorMap.get(mainSelector) || false,
          description: '',
          parsedStyle: {},
        };
        componentCSSInfo.cssRules.push(cssRule);
        componentCSSInfo.cssRuleMap.set(mainSelector, cssRule);
      }

      const StateMap = {
        hover: '鼠标移入',
        active: '鼠标按下',
        focus: '获得焦点',
        // visited: '已访问',
      };
      Object.keys(StateMap).forEach((state) => {
        const selector = `${mainSelector}:${state},${mainSelector}._${state}`;
        // const mainSelectorCSSRule = componentCSSInfo.cssRuleMap.get(mainSelector);
        // const mainSelectorDescription = cssRulesDesc[componentName]?.[mainSelector] || mainSelectorCSSRule?.description;

        if (!componentCSSInfo.cssRuleMap.has(selector)) {
          const cssRule: CSSRule = {
            selector,
            isStartRoot: componentCSSInfo.mainSelectorMap.get(mainSelector) || false,
            description: '', // mainSelectorDescription ? `${mainSelectorDescription}:${StateMap[state]}` : '',
            parsedStyle: {},
          };
          componentCSSInfo.cssRules.push(cssRule);
          componentCSSInfo.cssRuleMap.set(selector, cssRule);
        }
      });
    }

    let cssDescMap = cssRulesDesc[componentName];
    if (!cssDescMap) cssDescMap = cssRulesDesc[componentName] = {};

    componentCSSInfo.cssRules.forEach((rule) => {
      const matchedMainSelector = Array.from(componentCSSInfo.mainSelectorMap.keys()).find((mainSelector) => rule.selector.startsWith(mainSelector.split(/[ +>~]/g)[0]));
      !matchedMainSelector && console.warn(`selector: ${rule.selector} 匹配 mainSelector: ${matchedMainSelector}`);
      rule.description = cssDescMap[rule.selector] = allCSSDescMap[rule.selector] || '';
    });
    // eslint-disable-next-line no-nested-ternary
    // componentCSSInfo.cssRules 不应该排序
    Object.keys(cssDescMap).forEach((selector) => {
      if (!componentCSSInfo.cssRuleMap.has(selector)) delete cssDescMap[selector];
    });
    cssRulesDesc[componentName] = cssDescMap;
  });

  return { componentCSSInfoMap, cssRulesDesc, cssContent: root.toResult().css };
}

function postprocessCSSInfo(
  componentCSSInfoMap: Record<string, ComponentCSSInfo>,
  cssRulesDesc: Record<string, Record<string, string>>,
  componentNameMap: Record<string, string | undefined>,
  options: LcapBuildOptions,
) {
  const componentNames = Object.keys(componentNameMap);

  if (options.reportCSSInfo?.extraComponentMap) {
    /**
     * 根据依赖组件补充信息
     * 从上到下的顺序
     */
    Object.entries(options.reportCSSInfo.extraComponentMap).forEach(([componentName, extraComponentInfo]) => {
      const _depComponentMap: Record<string, DepComponent> = {};
      Object.entries(extraComponentInfo.depComponentMap || {}).forEach(([depName, depItem]) => {
        if (typeof depItem === 'boolean') {
          _depComponentMap[depName] = {
            componentName: depName,
            stillRoot: depItem,
          };
        } else if ('stillRoot' in depItem) {
          if ('cssInfo' in depItem && !depItem.cssInfo) throw new Error(`组件 ${componentName} 的依赖组件 ${depName} 配置错误`);
          _depComponentMap[depName] = depItem;
        } else {
          if (!depItem) throw new Error(`组件 ${componentName} 的依赖组件 ${depName} 配置错误`);
          _depComponentMap[depName] = {
            componentName: depName,
            cssInfo: depItem,
            stillRoot: false,
          };
        }
      });
      extraComponentInfo.depComponents?.forEach((depItem) => {
        let depName = '';
        if (typeof depItem === 'string') {
          depName = depItem;
          if (_depComponentMap[depName]) return;

          _depComponentMap[depName] = {
            componentName: depName,
            stillRoot: false,
          };
        } else {
          depName = depItem.componentName;
          if (_depComponentMap[depName]) return;
          if ('cssInfo' in depItem && !depItem.cssInfo) throw new Error(`组件 ${componentName} 的依赖组件 ${depName} 配置错误`);

          _depComponentMap[depName] = depItem;
        }
      });
      if ('extends' in extraComponentInfo && !extraComponentInfo.extends) throw new Error(`组件 ${componentName} 的 extends 配置错误`);
      if (extraComponentInfo.extends) {
        const baseName = `_Base${componentName}`;
        _depComponentMap[baseName] = {
          componentName: baseName,
          cssInfo: extraComponentInfo.extends,
          stillRoot: true,
        };
      }

      Object.keys(_depComponentMap).forEach((depName) => {
        const depItem = _depComponentMap[depName];
        const stillRoot = depItem.stillRoot;
        options.reportCSSInfo?.verbose && console.info(`[INFO] 组件 ${componentName} 依赖 ${depName}，且${stillRoot ? '仍为根节点' : '不为根节点'}`);

        const _depCSSInfo = componentCSSInfoMap[depName];
        if (!_depCSSInfo && !depItem.cssInfo) throw new Error(`组件 ${componentName} 找不到依赖组件 ${depName} 的配置`);
        [_depCSSInfo, depItem.cssInfo && convertFinalCSSInfoToInner(depItem.cssInfo)].forEach((depCSSInfo) => {
          if (!depCSSInfo) return;

          let currCSSInfo = componentCSSInfoMap[componentName];
          if (!currCSSInfo) {
            currCSSInfo = componentCSSInfoMap[componentName] = {
              cssRules: [],
              cssRuleMap: new Map(),
              mainSelectorMap: new Map(),
            };
          }

          // 补充 cssRules 和 cssRuleMap
          depCSSInfo.cssRules.forEach((rule) => {
            const newRule = {
              ...rule,
              isStartRoot: stillRoot && rule.isStartRoot,
            };

            // 采取不覆盖策略，保证自定义配置的优先级
            if (!currCSSInfo.cssRuleMap.has(rule.selector)) {
              currCSSInfo.cssRules.push(newRule);
              currCSSInfo.cssRuleMap.set(rule.selector, newRule);
            }
            // else { // 去重
            //   const index = currCSSInfo.cssRules.findIndex((item) => item.selector === rule.selector);
            //   currCSSInfo.cssRules[index] = newRule;
            //   currCSSInfo.cssRuleMap.set(rule.selector, newRule);
            // }
          });

          // 补充 mainSelectorMap
          depCSSInfo.mainSelectorMap.forEach((value, key) => {
            // 采取不覆盖策略，保证自定义配置的优先级
            if (!currCSSInfo.mainSelectorMap.has(key)) {
              currCSSInfo.mainSelectorMap.set(key, stillRoot ? value : false);
            }
          });
        });

        // 补充 cssRules 的中文描述
        [cssRulesDesc[depName], depItem.cssInfo && convertFinalCSSInfoToDesc(depItem.cssInfo)].forEach((depCSSRulesDesc) => {
          if (!depCSSRulesDesc) return;
          Object.entries(depCSSRulesDesc).forEach(([selectorKey, desc]) => {
            let descObj = cssRulesDesc[componentName];
            if (!descObj) descObj = cssRulesDesc[componentName] = {};
            if (!descObj[selectorKey]) {
              descObj[selectorKey] = desc; // 采取不覆盖策略，保证自定义配置的优先级
              const cssRule = componentCSSInfoMap[componentName]?.cssRuleMap.get(selectorKey);
              if (cssRule) cssRule.description = desc;
            }
          });
        });
      });
    });

    /**
     * 过滤掉需要隐藏的选择器
     */
    Object.entries(options.reportCSSInfo.extraComponentMap).forEach(([componentName, extraComponentInfo]) => {
      if (!extraComponentInfo.hideSelectorPrefixes) return;
      const hideSelectorPrefixes = extraComponentInfo.hideSelectorPrefixes;

      const compCssDesc = cssRulesDesc[componentName];
      const compCssInfo = componentCSSInfoMap[componentName];
      Object.keys(compCssDesc).forEach((selectorKey) => {
        if (startsWithPrefix(hideSelectorPrefixes, selectorKey)) {
          delete compCssDesc[selectorKey];
        }
      });
      Object.keys(compCssInfo.mainSelectorMap).forEach((selectorKey) => {
        if (startsWithPrefix(hideSelectorPrefixes, selectorKey)) {
          delete compCssInfo.mainSelectorMap[selectorKey];
        }
      });
      compCssInfo.cssRules = compCssInfo.cssRules.filter((rule) => {
        return !startsWithPrefix(hideSelectorPrefixes, rule.selector);
      });
    });
    /**
     * 过滤掉需要隐藏的选择器
     */
    Object.entries(options.reportCSSInfo.extraComponentMap).forEach(([componentName, extraComponentInfo]) => {
      if (!extraComponentInfo.hideSelectorRegexps) return;
      const hideSelectorRegexps = extraComponentInfo.hideSelectorRegexps;

      const compCssDesc = cssRulesDesc[componentName];
      const compCssInfo = componentCSSInfoMap[componentName];
      if (!compCssDesc || !compCssInfo) return;
      Object.keys(compCssDesc).forEach((selectorKey) => {
        if (hideSelectorRegexps.some((reg) => reg.test(selectorKey))) {
          delete compCssDesc[selectorKey];
        }
      });
      Object.keys(compCssInfo.mainSelectorMap).forEach((selectorKey) => {
        if (hideSelectorRegexps.some((reg) => reg.test(selectorKey))) {
          delete compCssInfo.mainSelectorMap[selectorKey];
        }
      });
      compCssInfo.cssRules = compCssInfo.cssRules.filter((rule) => {
        return !hideSelectorRegexps.some((reg) => reg.test(rule.selector));
      });
    });
  }

  /**
   * 如果组件已经不存在了，就在描述中也删除掉
   */
  Object.keys(cssRulesDesc).forEach((componentName) => {
    if (!componentCSSInfoMap[componentName]) delete cssRulesDesc[componentName];
    else cssRulesDesc[componentName] = sortMap(cssRulesDesc[componentName]);
  });

  if (options.reportCSSInfo?.verbose) {
    componentNames.forEach((componentName) => {
      if (!componentCSSInfoMap[componentName]) console.warn(`[WARN] 组件 ${componentName} 上未匹配到任何选择器`);
    });
  }
}

function convertCSSInfoMapToFinal(cssInfoMap: Record<string, ComponentCSSInfo>) {
  const final: Record<string, FinalComponentCSSInfo> = {};
  Object.entries(cssInfoMap).forEach(([componentName, cssInfo]) => {
    final[componentName] = {
        cssRules: Array.from(cssInfo.cssRules),
        mainSelectorMap: Object.fromEntries(cssInfo.mainSelectorMap),
    };
  });
  return final;
}

function convertFinalCSSInfoToInner(cssInfo: FinalComponentCSSInfo) {
  return {
    cssRules: cssInfo.cssRules,
    mainSelectorMap: new Map(Object.entries(cssInfo.mainSelectorMap)),
  };
}

function convertFinalCSSInfoToDesc(cssInfo: FinalComponentCSSInfo) {
  const result: Record<string, string> = {};
  cssInfo.cssRules.forEach((rule) => {
    result[rule.selector] = rule.description;
  });
  return result;
}

export default function buildCSSInfo(options: LcapBuildOptions) {
  if (!options.reportCSSInfo || !options.reportCSSInfo.enabled) {
    return;
  }

  const components = getComponentMetaInfos(options.rootPath, true);
  const componentNameMap: Record<string, string | undefined> = {}; // { componentName: parentName }
  components.forEach((component) => {
    // 这里用了个技巧，先匹配子组件
    component.children?.forEach((child) => {
      componentNameMap[child.name] = component.name;
    });
    componentNameMap[component.name] = undefined;
  });

  const cssContent = fs.readFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), 'utf-8');

  const cssRulesDescPath = path.resolve(options.rootPath, 'index.css-info-desc.json');
  const cssRulesDesc = fs.existsSync(cssRulesDescPath) ? fs.readJSONSync(cssRulesDescPath) : {};

  const result = parseCSSInfo(cssContent, cssRulesDesc, componentNameMap, options);
  postprocessCSSInfo(result.componentCSSInfoMap, result.cssRulesDesc, componentNameMap, options);

  fs.writeJSONSync(path.resolve(options.rootPath, options.destDir, 'index.css-info-map.json'), convertCSSInfoMapToFinal(result.componentCSSInfoMap), { spaces: 2 });
  fs.writeJSONSync(path.resolve(options.rootPath, 'index.css-info-desc.json'), sortMap(result.cssRulesDesc), { spaces: 2 });
  fs.writeFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), result.cssContent);
}

export function batchDepCSSInfo(
  originComponentNames: string[],
  renameComponent: (oldName: string) => string,
  stillRoot = true,
) {
  const result: Record<string, {
    depComponentMap: Record<string, boolean>;
  }> = {};

  originComponentNames.forEach((componentName) => {
    result[renameComponent(componentName)] = {
      depComponentMap: {
        [componentName]: stillRoot,
      },
    };
  });

  return result;
}
export function batchDepBasicCSSInfo(
  basicCSSInfo: Record<string, FinalComponentCSSInfo>,
  originComponentNames: string[],
  renameComponent: (oldName: string) => string,
  stillRoot = true,
) {
  const result: Record<string, {
    depComponentMap: Record<string, DepComponent>;
  }> = {};

  originComponentNames.forEach((componentName) => {
    result[renameComponent(componentName)] = {
      depComponentMap: {
        [componentName]: {
          componentName,
          stillRoot,
          cssInfo: basicCSSInfo[componentName],
        },
      },
    };
  });

  return result;
}

export function extendsCSSInfo(
  cssInfo: FinalComponentCSSInfo,
  renameSelector?: (oldSelector: string) => string,
) {
  const result = {
    cssRules: cssInfo.cssRules.map((cssRule) => ({
      ...cssRule,
      selector: renameSelector ? renameSelector(cssRule.selector) : cssRule.selector,
    })),
    mainSelectorMap: Object.entries(cssInfo.mainSelectorMap).reduce(
      (prev, [selector, isStartRoot]) => ({ ...prev, [renameSelector ? renameSelector(selector) : selector]: isStartRoot }),
      {} as Record<string, boolean>,
    ),
  };
  return result;
}
