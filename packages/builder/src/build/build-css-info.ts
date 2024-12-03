/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */

import fs from 'fs-extra';
import path from 'path';
import * as postcss from 'postcss';
import { parse } from 'postcss-values-parser';
import { camelCase, kebabCase, capitalize } from 'lodash';
import type {
  LcapBuildOptions, CSSValue, CSSRule, SupportedCSSProperty,
} from './types';

function sortMap(map: Record<string, any>) {
  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
}

function getChildrenValue(val: Record<string, any>) {
  return val.nodes.map((node) => node.toString());
}

function isStartWithPrefix(hiddenSelectorPreFixList, selectorKey) {
  return hiddenSelectorPreFixList.some((selectorPrefix) => selectorKey.startsWith(selectorPrefix) || selectorKey.startsWith(`[class*=${selectorPrefix}`));
}

function parseCSSInfo(cssContent: string, componentNameMap: Record<string, string | undefined>, cssRulesDesc: Record<string, Record<string, string>>, options: LcapBuildOptions) {
  const componentNames = Object.keys(componentNameMap);
  const allCSSDescMap = Object.values(cssRulesDesc).reduce((acc, item) => Object.assign(acc, item), {});

  const root = postcss.parse(cssContent);

  const hasPesudoClassRE = /:(hover|active|focus)/;
  const hasPesudoStateRE = /(:|\._)(hover|active|focus)/;
  const isNonStandardRE = /-(moz|webkit|ms|o)-/;
  const hasPesudoElementRE = /::|:(before|after|selection)/;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)___[a-zA-Z0-9-]{6,}/;

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

  const componentCSSInfoMap: Record<string, {
    cssRules: CSSRule[],
    cssRuleMap: Map<string, CSSRule>,
    mainSelectorMap: Map<string, boolean>,
  }> = {};

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
          if (tempComponentName) console.log(`[WARN] 未匹配到组件 ${tempComponentName} 上的选择器: ${selector}`);
          const tempComponentName2 = componentNames.find((name) => {
            name = kebabCase(name);
            return new RegExp(`^\\.${name}|^\\[class\\*=${name}`).test(selector) && !/:(before|after)$/.test(selector);
          });
          if (!tempComponentName && tempComponentName2) console.log(`[WARN] ==== 未匹配到组件 ${tempComponentName2} 上的选择器: ${selector}`);
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
      !matchedMainSelector && console.log(`selector: ${rule.selector} 匹配 mainSelector: ${matchedMainSelector}`);
      rule.description = cssDescMap[rule.selector] = allCSSDescMap[rule.selector] || '';
    });
    // eslint-disable-next-line no-nested-ternary
    // componentCSSInfo.cssRules 不应该排序
    Object.keys(cssDescMap).forEach((selector) => {
      if (!componentCSSInfo.cssRuleMap.has(selector)) delete cssDescMap[selector];
    });
    cssRulesDesc[componentName] = sortMap(cssDescMap);

    const finalComponentCSSInfo = componentCSSInfo as any;
    finalComponentCSSInfo.mainSelectorMap = Object.fromEntries(componentCSSInfo.mainSelectorMap);
    delete finalComponentCSSInfo.cssRuleMap;
  });
  Object.keys(cssRulesDesc).forEach((componentName) => {
    if (!componentCSSInfoMap[componentName]) delete cssRulesDesc[componentName];
  });

  if (options.reportCSSInfo?.verbose) {
    componentNames.forEach((componentName) => {
      if (!componentCSSInfoMap[componentName]) console.log(`[WARN] 组件 ${componentName} 上未匹配到任何选择器`);
    });
  }

  //  过滤掉需要隐藏的选择器
  if (options.reportCSSInfo?.extraComponentMap) {
    const compKeys = Object.keys(options.reportCSSInfo.extraComponentMap);
    compKeys.forEach((curCompName) => {
      const hiddenSelectorPreFixList = options.reportCSSInfo?.extraComponentMap?.[curCompName]?.hiddenSelectorPreFixList;
      if (hiddenSelectorPreFixList) {
        const compCssDesc = cssRulesDesc[curCompName];
        const compCssInfo = componentCSSInfoMap[curCompName];
        Object.keys(compCssDesc).forEach((selectorKey) => {
          if (isStartWithPrefix(hiddenSelectorPreFixList, selectorKey)) {
            delete compCssDesc[selectorKey];
          }
        });
        Object.keys(compCssInfo.mainSelectorMap).forEach((selectorKey) => {
          if (isStartWithPrefix(hiddenSelectorPreFixList, selectorKey)) {
            delete compCssInfo.mainSelectorMap[selectorKey];
          }
        });
        compCssInfo.cssRules = compCssInfo.cssRules.filter((rule) => {
          return !isStartWithPrefix(hiddenSelectorPreFixList, rule.selector);
        });
      }
    });
  }

  // 整合
  if (options.reportCSSInfo?.extraComponentMap) {
    const compKeys = Object.keys(options.reportCSSInfo.extraComponentMap);
    for (let i = 0; i < compKeys.length; i++) {
      const curCompName = compKeys[i];
      const { depCompList } = options.reportCSSInfo.extraComponentMap[compKeys[i]];
      if (depCompList && depCompList.length) {
        for (let j = 0; j < depCompList.length; j++) {
          const depCompItem = depCompList[j];
          let depCompName = '';
          let isResetRoot = true;
          if (typeof depCompItem !== 'string') {
            depCompName = depCompItem.compName;
            isResetRoot = depCompItem.isResetRoot;
          } else {
            depCompName = depCompItem;
          }
          const depCompCssDesc = cssRulesDesc[depCompName];
          cssRulesDesc[curCompName] = { ...cssRulesDesc[curCompName], ...depCompCssDesc };
          const depCompCssInfo = componentCSSInfoMap[depCompName];
          const resetCssRules = depCompCssInfo.cssRules.map((rule) => {
            return {
              ...rule,
              isStartRoot: isResetRoot ? false : rule.isStartRoot,
            };
          });
          const resetMainSelectorMap = isResetRoot ? Object.keys(depCompCssInfo.mainSelectorMap).reduce((acc, selector) => {
            acc[selector] = false;
            return acc;
          }, {}) : { ...depCompCssInfo.mainSelectorMap };

          if (!componentCSSInfoMap[curCompName]) {
            componentCSSInfoMap[curCompName] = {
              cssRules: [],
              cssRuleMap: new Map(),
              mainSelectorMap: new Map(),
            };
          }
          componentCSSInfoMap[curCompName].cssRules = [...componentCSSInfoMap[curCompName].cssRules, ...resetCssRules];
          componentCSSInfoMap[curCompName].mainSelectorMap = { ...componentCSSInfoMap[curCompName].mainSelectorMap, ...resetMainSelectorMap };
        }
      }
    }
  }

  return { componentCSSInfoMap, cssRulesDesc, cssContent: root.toResult().css };
}

// function collectComponentNames(componentList: any) {
//   const componentNames: string[] = [];
//   componentList.forEach((component) => {
//     if (component.ignore) return;
//     componentNames.push(component.name);
//     if (component.children) {
//       componentNames.push(...collectComponentNames(component.children));
//     }
//   });
//   return componentNames;
// }

// { componentName: parentName }
function collectComponentNameMap(
  componentList: Array<{ name: string, ignore: boolean, children?: Array<{ name: string, ignore: boolean }> }>,
  parentName?: string,
) {
  const componentNameMap: Record<string, string | undefined> = {};
  componentList.forEach((component) => {
    if (component.ignore) return;
    // 这里用了个技巧，先匹配子组件
    component.children && Object.assign(componentNameMap, collectComponentNameMap(component.children, component.name));
    componentNameMap[component.name] = parentName;
  });
  return componentNameMap;
}

export default function buildCSSInfo(options: LcapBuildOptions) {
  if (!options.reportCSSInfo || !options.reportCSSInfo.enabled) {
    return;
  }

  const componentList = fs.readJSONSync(path.resolve(options.rootPath, options.destDir, 'nasl.ui.json'), 'utf-8');
  const componentNameMap = collectComponentNameMap(componentList);

  const cssContent = fs.readFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), 'utf-8');

  const cssRulesDescPath = path.resolve(options.rootPath, 'index.css-info-desc.json');
  const cssRulesDesc = fs.existsSync(cssRulesDescPath) ? fs.readJSONSync(cssRulesDescPath) : {};
  const result = parseCSSInfo(cssContent, componentNameMap, cssRulesDesc, options);

  fs.writeJSONSync(path.resolve(options.rootPath, options.destDir, 'index.css-info-map.json'), result.componentCSSInfoMap, { spaces: 2 });
  fs.writeJSONSync(path.resolve(options.rootPath, 'index.css-info-desc.json'), result.cssRulesDesc, { spaces: 2 });
  fs.writeFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), result.cssContent);
}
