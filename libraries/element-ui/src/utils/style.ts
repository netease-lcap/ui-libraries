import { isNil, kebabCase } from 'lodash';

const STYLE_SETTING_PROPERTIES = [
  'width',
  'height',
  'textAlign',
  'backgroundColor',
  'backgroundImage',
  'padding',
  'paddingLeft',
  'paddingBottom',
  'paddingTop',
  'paddingRight',
  'margin',
  'marginLeft',
  'marginBottom',
  'marginTop',
  'marginRight',
  'fontStyle',
  'fontSize',
  'fontWeight',
  'color',
  'textDecoration',
  'borderStyle',
  'borderColor',
  'borderWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
];

const genVarName = (key: string) => `--cw-style-${kebabCase(key)}`;
const genClassName = (key: string) => `cw-style-${kebabCase(key)}`;
const genConcatClassName = (key: string) => {
  let name = key;
  switch (name) {
    case 'padding':
    case 'paddingLeft':
    case 'paddingBottom':
    case 'paddingTop':
    case 'paddingRight':
      name = 'padding';
      break;
    case 'margin':
    case 'marginLeft':
    case 'marginBottom':
    case 'marginTop':
    case 'marginRight':
      name = 'margin';
      break;
    case 'borderWidth':
    case 'borderLeftWidth':
    case 'borderRightWidth':
    case 'borderTopWidth':
    case 'borderBottomWidth':
      name = 'borderWidth';
      break;
    case 'borderRadius':
    case 'borderTopLeftRadius':
    case 'borderTopRightRadius':
    case 'borderBottomLeftRadius':
    case 'borderBottomRightRadius':
      name = 'borderRadius';
      break;
  }


  return name ? genClassName(name) : '';
}

export function getVarMapAndClass(styleMap: Record<string, any>) {
  const classList: string[] = [];
  const varMap: Record<string, any> = {};

  if (!styleMap) {
    return { classList, varMap };
  }

  STYLE_SETTING_PROPERTIES.forEach((key) => {
    const kbcKey = kebabCase(key);
    const val = styleMap[key] || styleMap[kbcKey];

    if (isNil(val)) {
      return;
    }

    varMap[genVarName(key)] = val;

    [genClassName(key), genConcatClassName(key)].forEach((className) => {
      if (className && !classList.includes(className)) {
        classList.push(className);
      }
    });
  });

  return {
    varMap,
    classList,
  };
}
