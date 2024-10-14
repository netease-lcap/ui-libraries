/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */

import fs from 'fs-extra';
import path from 'path';
import * as postcss from 'postcss';
import type {
  LcapBuildOptions, CSSValue, CSSRule, SupportedCSSProperty,
} from '../build/types';
import { kebabCaseToCamelCase, firstLetterToUpperCase } from '../utils/string';

function parseCSSRules(cssContent: string, componentNames: string[], cssRulesDesc: Record<string, Record<string, string>>, getSelectorComponentName?: LcapBuildOptions['getSelectorComponentName']) {
  const root = postcss.parse(cssContent);

  const mockStateRE = /:(hover|active)/g;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)__[a-zA-Z0-9-]{6,}/g; // @TODO: 目前是两个下划线

  // eslint-disable-next-line no-shadow
  getSelectorComponentName = getSelectorComponentName || ((selector: string, componentNames: string[]) => {
    return componentNames.find((name) => new RegExp(`^\\.${name}_|^\\[class\\*=${name}__\\]`).test(selector));
  });

  function fixSelector(selector) {
    const selectors = selector
      .replace(/\s+/g, ' ') // 抹平换行符
      .replace(/\s*([>+~,])\s*/g, '$1'); // 统一去除空格
    return selectors
      .split(/,/g)
      .filter((sel) => !/^-(moz|webkit|ms|o)-|^_/.test(sel)) // 过滤掉浏览器前缀和 _ 开头的选择器
      .map((sel) => sel.replace(hashClassRE, '[class*=$1__]')) // hash 类名改为 [class*=] 属性选择器
      .flatMap((sel) => (mockStateRE.test(sel) ? [sel, sel.replace(mockStateRE, '._$1')] : [sel])) // 增加模拟伪类
      .join(',');
  }

  const cssRulesMap: Record<string, CSSRule[]> = {};

  root.nodes.forEach((node) => {
    if (node.type === 'rule') {
      const selector = fixSelector(node.selector);
      if (!selector) return;

      const componentName = getSelectorComponentName(selector, componentNames);
      if (!componentName) return;
      const currentCSSRules = cssRulesMap[componentName] = cssRulesMap[componentName] || [];

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
          parsedStyle[`border${firstLetterToUpperCase(borderProp)}Width`] = patchImportant({ defaultValue: borderWidth });
          parsedStyle[`border${firstLetterToUpperCase(borderProp)}Style`] = patchImportant({ defaultValue: borderStyle });
          parsedStyle[`border${firstLetterToUpperCase(borderProp)}Color`] = patchImportant({ defaultValue: borderColor });
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
          parsedStyle[kebabCaseToCamelCase(decl.prop)] = patchImportant({ defaultValue: decl.value });
        }
      });
      currentCSSRules.push({
        selector,
        description: '', // cssRuleSelectors[selector] || lastRuleDesc || '',
        // code: node.toString().replace(/^[\s\S]*?\{/, '{'),
        parsedStyle,
      });
    }
  });

  Object.keys(cssRulesMap).forEach((componentName) => {
    const cssRules = cssRulesMap[componentName];
    let cssDescMap = cssRulesDesc[componentName];
    if (!cssDescMap) cssDescMap = cssRulesDesc[componentName] = {};

    const selectorSet = new Set();
    cssRules.forEach((rule) => {
      rule.description = cssDescMap[rule.selector] = cssDescMap[rule.selector] || '';
      selectorSet.add(rule.selector);
    });
    Object.keys(cssDescMap).forEach((selector) => {
      if (!selectorSet.has(selector)) delete cssDescMap[selector];
    });
  });
  Object.keys(cssRulesDesc).forEach((componentName) => {
    if (!cssRulesMap[componentName]) delete cssRulesDesc[componentName];
  });

  return { cssRulesMap, cssRulesDesc };
}

function collectComponentNames(componentList: any) {
  const componentNames: string[] = [];
  componentList.forEach((component) => {
    componentNames.push(component.kebabName);
    if (component.children) {
      componentNames.push(...collectComponentNames(component.children));
    }
  });
  return componentNames;
}

export default function buildCSSRules(options: LcapBuildOptions) {
  const componentList = fs.readJSONSync(path.resolve(options.rootPath, options.destDir, 'nasl.ui.json'), 'utf-8');
  const componentNames = collectComponentNames(componentList);

  const cssContent = fs.readFileSync(path.resolve(options.rootPath, options.destDir, 'index.css'), 'utf-8');

  const cssRulesDescPath = path.resolve(options.rootPath, 'index.css-rules-desc.json');
  const cssRulesDesc = fs.existsSync(cssRulesDescPath) ? fs.readJSONSync(cssRulesDescPath) : {};
  const result = parseCSSRules(cssContent, componentNames, cssRulesDesc);

  fs.writeJSONSync(path.resolve(options.rootPath, options.destDir, 'index.css-rules-map.json'), result.cssRulesMap, { spaces: 2 });
  fs.writeJSONSync(path.resolve(options.rootPath, 'index.css-rules-desc.json'), result.cssRulesDesc, { spaces: 2 });
}
