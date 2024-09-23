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

function findComponentName(selector: string, componentNames: string[]) {
  return componentNames.find((name) => new RegExp(`^\\.${name}_|^\\[class\\^=${name}__\\]`).test(selector));
}

function parseCSSRules(cssContent: string, componentNames: string[]) {
  const root = postcss.parse(cssContent);
  // const cssRuleSelectors = fs.readJSONSync(path.join(__dirname, '../src/stores/cssRuleSelectors.json'));

  const mockStateRE = /:(hover|active)/g;
  const hashClassRE = /\.([a-zA-Z0-9][a-zA-Z0-9_-]*?)__[a-zA-Z0-9-]{6,}/g; // @TODO: 目前是两个下划线

  function fixSelector(selector) {
    const selectors = selector
      .replace(/\s+/g, ' ') // 抹平换行符
      .replace(/\s*([>+~,])\s*/g, '$1'); // 统一去除空格
    return selectors
      .split(/,/g)
      .filter((sel) => !/^-(moz|webkit|ms|o)-|^_/.test(sel)) // 过滤掉浏览器前缀和 _ 开头的选择器
      .map((sel) => sel.replace(hashClassRE, '[class^=$1__]')) // hash 类名改为 [class^=] 属性选择器
      .flatMap((sel) => (mockStateRE.test(sel) ? [sel, sel.replace(mockStateRE, '.$1')] : [sel])) // 增加模拟伪类
      .join(',');
  }
  // Object.keys(cssRuleSelectors).forEach((key) => {
  //     cssRuleSelectors[fixSelector(key)] = cssRuleSelectors[key];
  // });

  // const RE = {
  //   component: /^@component ([\w\d-]+)$/,
  //   'rule-desc': /^@rule-desc (.+)$/,
  // };

  const cssRulesDefinition: Record<string, CSSRule[]> = {};

  // let currentComponentName = '';
  // let currentCSSRules: CSSRule[] | undefined;
  // let lastRuleDesc: string | undefined;
  root.nodes.forEach((node) => {
    if (node.type === 'comment') {
      // const text = node.text;
      // let match;
      // if ((match = text.match(RE.component))) {
      //   currentComponentName = match[1];
      //   currentCSSRules = cssRulesDefinition[currentComponentName] = [] as CSSRule[];
      // } else if ((match = text.match(RE['rule-desc']))) {
      //   lastRuleDesc = match[1];
      // }
    } else if (node.type === 'rule') {
      // if (
      //   !(currentCSSRules
      //   && node.selector.startsWith(`.${currentComponentName}`))
      // ) return;

      const selector = fixSelector(node.selector);
      if (!selector) return;

      const componentName = findComponentName(selector, componentNames);
      if (!componentName) return;
      const currentCSSRules = cssRulesDefinition[componentName] = cssRulesDefinition[componentName] || [];

      const parsedStyle: Record<SupportedCSSProperty, CSSValue> = {} as Record<SupportedCSSProperty, CSSValue>;
      node.nodes.forEach((decl) => {
        if (decl.type === 'comment') return;
        if (decl.type !== 'decl') return;
        if (decl.prop.startsWith('--')) return;

        // if (decl.toString().includes('important')) {
        //     delete decl.parent;
        //     delete decl.source;
        //     console.log(JSON.stringify(decl));
        // }
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
    // lastRuleDesc = undefined;
  });

  return cssRulesDefinition;
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
  const cssRules = parseCSSRules(cssContent, componentNames);

  fs.writeJSONSync(path.resolve(options.rootPath, options.destDir, 'index.css-rules.json'), cssRules, { spaces: 2 });
}
