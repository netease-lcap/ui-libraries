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

function parseCSSInfo(cssContent: string, componentNames: string[], cssRulesDesc: Record<string, Record<string, string>>, options: LcapBuildOptions) {
  const root = postcss.parse(cssContent);

  const mockStateRE = /:(hover|active|focus)/g;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)___[a-zA-Z0-9-]{6,}/g; // @TODO: 目前是两个下划线

  // eslint-disable-next-line no-shadow
  const inferSelectorComponentName = options.reportCSSInfo?.inferSelectorComponentName || ((selector: string, componentNames: string[]) => {
    return componentNames.find((name) => {
      name = kebabCase(name);
      return new RegExp(`^\\.${name}(_|$)|^\\[class\\*=${name}___`).test(selector);
    });
  });

  function getMainSubSelector(subSelector: string) {
    const cap = subSelector.slice(1).match(/[[.:]/);
    return cap ? subSelector.slice(0, (cap.index || subSelector.length - 1) + 1) : subSelector;
  }

  const componentCSSInfoMap: Record<string, {
    cssRules: CSSRule[],
    cssRuleMap: Map<string, CSSRule>,
    mainSelectorSet: Set<string>,
    mainSelectors: string[],
  }> = {};

  root.nodes.forEach((node) => {
    if (node.type === 'rule') {
      let selectors = node.selector
        .replace(/\s+/g, ' ') // 抹平换行符
        .replace(/\s*([>+~,])\s*/g, '$1') // 统一去除空格
        .split(/,/g)
        .flatMap((sel) => (mockStateRE.test(sel) ? [sel, sel.replace(mockStateRE, '._$1')] : [sel])); // 增加模拟伪类

      node.selector = selectors.join(','); // 更新 CSS 代码中的选择器

      selectors = selectors
        .filter((sel) => !/^-(moz|webkit|ms|o)-|^_/.test(sel)) // 过滤掉浏览器前缀和 _ 开头的选择器
        .map((sel) => sel.replace(hashClassRE, '[class*=$1___]')); // hash 类名改为 [class*=] 属性选择器

      const mainSelectors: string[] = [];

      selectors.forEach((selector) => {
        let mainSelector = '';
        const re = /[ +>~]/g;
        let cap;
        let lastIndex = 0;
        while ((cap = re.exec(selector))) {
          mainSelector += getMainSubSelector(selector.slice(lastIndex, cap.index)) + cap[0];
          lastIndex = cap.index + 1;
        }
        mainSelector += getMainSubSelector(selector.slice(lastIndex));

        mainSelectors.push(mainSelector);
      });

      const selector = selectors.join(',');
      if (!selector) return;

      const componentName = inferSelectorComponentName?.(selector, componentNames);
      if (!componentName) return;

      const componentCSSInfo = componentCSSInfoMap[componentName] = componentCSSInfoMap[componentName] || {
        cssRules: [],
        cssRuleMap: new Map(),
        mainSelectors: [],
        mainSelectorSet: new Set(),
      };
      mainSelectors.forEach((mainSelector) => componentCSSInfo.mainSelectorSet.add(mainSelector));
      if (options.reportCSSInfo?.addComponentMainSelectors?.[componentName]) {
        options.reportCSSInfo.addComponentMainSelectors[componentName].forEach((mainSelector) => componentCSSInfo.mainSelectorSet.add(mainSelector));
      }

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
        description: '', // cssRuleSelectors[selector] || lastRuleDesc || '',
        // code: node.toString().replace(/^[\s\S]*?\{/, '{'),
        parsedStyle,
      };
      componentCSSInfo.cssRules.push(cssRule);
      componentCSSInfo.cssRuleMap.set(selector, cssRule);
    }
  });

  Object.keys(componentCSSInfoMap).forEach((componentName) => {
    const componentCSSInfo = componentCSSInfoMap[componentName];

    // eslint-disable-next-line no-restricted-syntax
    for (const mainSelector of componentCSSInfo.mainSelectorSet) {
      if (!componentCSSInfo.cssRuleMap.has(mainSelector)) {
        const cssRule: CSSRule = {
          selector: mainSelector,
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
        const mainSelectorCSSRule = componentCSSInfo.cssRuleMap.get(mainSelector);
        // const mainSelectorDescription = cssRulesDesc[componentName]?.[mainSelector] || mainSelectorCSSRule?.description;

        if (!componentCSSInfo.cssRuleMap.has(selector)) {
          const cssRule: CSSRule = {
            selector,
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
      rule.description = cssDescMap[rule.selector] = cssDescMap[rule.selector] || '';
    });
    Object.keys(cssDescMap).forEach((selector) => {
      if (!componentCSSInfo.cssRuleMap.has(selector)) delete cssDescMap[selector];
    });

    componentCSSInfo.mainSelectors = Array.from(componentCSSInfo.mainSelectorSet);

    const finalComponentCSSInfo = componentCSSInfo as any;
    delete finalComponentCSSInfo.mainSelectorSet;
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
    componentNames.push(component.name);
    if (component.children) {
      componentNames.push(...collectComponentNames(component.children));
    }
  });
  return componentNames;
}

export default function buildCSSInfo(options: LcapBuildOptions) {
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
