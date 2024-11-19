/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */

import fs from 'fs-extra';
import path from 'path';
import * as postcss from 'postcss';
import { camelCase, kebabCase, capitalize } from 'lodash';
import type {
  LcapBuildOptions, CSSValue, CSSRule, SupportedCSSProperty,
} from './types';

function sortMap(map: Record<string, any>) {
  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
}

function parseCSSInfo(cssContent: string, componentNames: string[], cssRulesDesc: Record<string, Record<string, string>>, options: LcapBuildOptions) {
  const root = postcss.parse(cssContent);

  const mockStateRE = /:(hover|active|focus)/g;
  const isNonStandardRE = /-(moz|webkit|ms|o)-/g;
  const hasPesudoElementRE = /::|:(before|after|selection)/g;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)___[a-zA-Z0-9-]{6,}/g;

  // eslint-disable-next-line no-shadow
  const inferSelectorComponentName = options.reportCSSInfo?.inferSelectorComponentName || ((selector: string, componentNames: string[]) => {
    return componentNames.find((componentName) => {
      const firstPrefix = kebabCase(componentName);
      const prefixMap = { [firstPrefix]: true };
      const proRE = /^el-(.+)-pro$/;
      if (proRE.test(firstPrefix)) prefixMap[firstPrefix.replace(proRE, 'el-p-$1')] = true;

      const selectorPrefixMap = options.reportCSSInfo?.extraComponentMap?.[componentName]?.selectorPrefixMap;
      selectorPrefixMap && Object.assign(prefixMap, selectorPrefixMap);

      const re = new RegExp(Object.keys(prefixMap).map((prefix) => `^\\.${prefix}(__|--|$|[ +>~\\.:\\[])|^\\[class\\*=${prefix}_`).join('|'));
      return re.test(selector) && !/:(before|after)$|vusion|s-empty|designer|cw-style/.test(selector);
    });
  });

  function getMainSubSelector(subSelector: string) {
    const cap = subSelector.slice(1).match(/[[.:]/);
    return cap ? subSelector.slice(0, (cap.index || subSelector.length - 1) + 1) : subSelector;
  }

  const isSelectorStartRoot = options.reportCSSInfo?.isSelectorStartRoot || ((selector: string, componentName: string) => {
    const firstPrefix = kebabCase(componentName);
    const prefixMap = { [firstPrefix]: true };
    const proRE = /^el-(.+)-pro$/;
    if (proRE.test(firstPrefix)) prefixMap[firstPrefix.replace(proRE, 'el-p-$1')] = true;
    const selectorPrefixMap = options.reportCSSInfo?.extraComponentMap?.[componentName]?.selectorPrefixMap;
    selectorPrefixMap && Object.assign(prefixMap, selectorPrefixMap);

    const notRootPrefixes: string[] = [];
    const rootPrefixes: string[] = [];
    Object.entries(prefixMap).forEach(([prefix, isRoot]) => {
      (isRoot ? rootPrefixes : notRootPrefixes).push(prefix);
    });

    let re = new RegExp(notRootPrefixes.map((prefix) => `^\\.${prefix}(--|$|[ +>~\\.:])|^\\[class\\*=${prefix}___`).join('|'));
    if (re.test(selector)) return false;
    re = new RegExp(rootPrefixes.map((prefix) => `^\\.${prefix}(--|$|[ +>~\\.:])|^\\[class\\*=${prefix}___`).join('|'));
    return re.test(selector);
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
        .flatMap((sel) => (mockStateRE.test(sel) && !hasPesudoElementRE.test(sel) ? [sel, sel.replace(mockStateRE, '._$1')] : [sel])); // 增加模拟伪类

      node.selector = selectors.join(','); // 更新 CSS 代码中的选择器

      selectors = selectors
        // .filter((sel) => !/|ms|o)-|^_/.test(sel)) // 过滤掉浏览器前缀和 _ 开头的选择器
        .map((sel) => sel.replace(hashClassRE, '[class*=$1___]')); // hash 类名改为 [class*=] 属性选择器

      const selector = selectors.join(',');
      if (!selector) return;

      const componentName = inferSelectorComponentName?.(selector, componentNames);
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
        if (mainSelector.endsWith(' *') || mainSelector.endsWith('>*')) return;

        componentCSSInfo.mainSelectorMap.set(mainSelector, isSelectorStartRoot(mainSelector, componentName));
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
          const arr = value.split(/\s+/);
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
          const arr = value.split(/\s+/);
          if (arr.length < 3) return;
          const [borderWidth, borderStyle, borderColor] = arr;
          parsedStyle[`border${capitalize(borderProp)}Width`] = patchImportant({ defaultValue: borderWidth });
          parsedStyle[`border${capitalize(borderProp)}Style`] = patchImportant({ defaultValue: borderStyle });
          parsedStyle[`border${capitalize(borderProp)}Color`] = patchImportant({ defaultValue: borderColor });
        } else if (decl.prop === 'margin') {
          const arr = value.split(/\s+/);
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
          const arr = value.split(/\s+/);
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
          const arr = value.split(/\s+/);
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
        isStartRoot: isSelectorStartRoot(selector, componentName),
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
      rule.description = cssDescMap[rule.selector] = cssDescMap[rule.selector] || '';
    });
    // eslint-disable-next-line no-nested-ternary
    // componentCSSInfo.cssRules.sort((a, b) => (a.selector === b.selector ? 0 : a.selector < b.selector ? -1 : 1));
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

  return { componentCSSInfoMap, cssRulesDesc, cssContent: root.toResult().css };
}

function collectComponentNames(componentList: any) {
  const componentNames: string[] = [];
  componentList.forEach((component) => {
    if (component.ignore) return;
    componentNames.push(component.name);
    if (component.children) {
      componentNames.push(...collectComponentNames(component.children));
    }
  });
  return componentNames;
}

export default function buildCSSInfo(options: LcapBuildOptions) {
  if (!options.reportCSSInfo || !options.reportCSSInfo.enabled) {
    return;
  }

  const componentList = fs.readJSONSync(path.resolve(options.rootPath, options.destDir, 'nasl.ui.json'), 'utf-8');
  const componentNames = collectComponentNames(componentList);

  const cssContent = fs.readFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), 'utf-8');

  const cssRulesDescPath = path.resolve(options.rootPath, 'index.css-info-desc.json');
  const cssRulesDesc = fs.existsSync(cssRulesDescPath) ? fs.readJSONSync(cssRulesDescPath) : {};
  const result = parseCSSInfo(cssContent, componentNames, cssRulesDesc, options);

  fs.writeJSONSync(path.resolve(options.rootPath, options.destDir, 'index.css-info-map.json'), result.componentCSSInfoMap, { spaces: 2 });
  fs.writeJSONSync(path.resolve(options.rootPath, 'index.css-info-desc.json'), result.cssRulesDesc, { spaces: 2 });
  fs.writeFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), result.cssContent);
}
