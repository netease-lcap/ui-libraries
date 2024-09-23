/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */

import * as postcss from 'postcss';
import type { CSSValue, CSSRule, SupportedCSSProperty } from '../build/types';

export default (cssContent: string) => {
  const root = postcss.parse(cssContent);
  // const cssRuleSelectors = fs.readJSONSync(path.join(__dirname, '../src/stores/cssRuleSelectors.json'));

  const kebabToCamel = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const firstLetterToUpperCase = (str) => str[0].toUpperCase() + str.slice(1);

  const mockStateRE = /:(hover|active)/g;

  function fixSelector(selector) {
    const selectors = selector
      .replace(/\s+/g, ' ')
      .replace(/\s*([>+~,])\s*/g, '$1');
    return selectors
      .split(/,/g)
      .filter((sel) => !/-(moz|webkit|ms|o)-/.test(sel))
      .flatMap((sel) => (mockStateRE.test(sel) ? [sel, sel.replace(mockStateRE, '.$1')] : [sel]))
      .join(',');
  }
  // Object.keys(cssRuleSelectors).forEach((key) => {
  //     cssRuleSelectors[fixSelector(key)] = cssRuleSelectors[key];
  // });

  const RE = {
    component: /^@component ([\w\d-]+)$/,
    'rule-desc': /^@rule-desc (.+)$/,
  };

  const cssRulesDefinition: Record<string, CSSRule[]> = {};

  let currentComponentName = '';
  let currentCSSRules: CSSRule[] | undefined;
  let lastRuleDesc: string | undefined;
  root.nodes.forEach((node) => {
    if (node.type === 'comment') {
      const text = node.text;
      let match;
      if ((match = text.match(RE.component))) {
        currentComponentName = match[1];
        currentCSSRules = cssRulesDefinition[currentComponentName] = [] as CSSRule[];
      } else if ((match = text.match(RE['rule-desc']))) {
        lastRuleDesc = match[1];
      }
    } else if (node.type === 'rule') {
      if (
        currentCSSRules
        && node.selector.startsWith(`.${currentComponentName}`)
      ) {
        const selector = fixSelector(node.selector);
        if (!selector) return;

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
            parsedStyle[kebabToCamel(decl.prop)] = patchImportant({ defaultValue: decl.value });
          }
        });
        currentCSSRules.push({
          selector,
          description: '', // cssRuleSelectors[selector] || lastRuleDesc || '',
          // code: node.toString().replace(/^[\s\S]*?\{/, '{'),
          parsedStyle,
        });
      }
      lastRuleDesc = undefined;
    }
  });
};
