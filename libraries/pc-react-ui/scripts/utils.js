const lodash = require('lodash');
const aliasTokens = require('./aliasTokens');
const prefix = 'cw-';
const css = 'cw-nasl';

exports.genCssVarCode = (vars, compName, useGlobalTokens) => {
  const cssNames = [`.${css}`];

  if (compName) {
    const compCls = prefix + lodash.kebabCase(compName);
    cssNames.push(`.${compCls},\n.${css}.${compCls}-css-var`);

  }

  const varCodes = vars.map((cssVar) => {
    const annotations = ['type', 'title', 'desc'];
    const codes = [
      '  /**',
      '   */',
    ];

    annotations.forEach((key) => {
      if (cssVar[key]) {
        codes.splice(1, 0, `   * @${key} ${cssVar[key]}`)
      }
    });


    const varName = `--${prefix}${compName ? `${lodash.kebabCase(compName)}-` : '' }${lodash.kebabCase(cssVar.name)}`;
    const value = aliasTokens[varName] || cssVar.value;

    codes.push(`  ${varName}: ${value};`)

    return codes.join('\n');
  });

  let dependencyAnnotaton = [];
  if (compName) {
    dependencyAnnotaton = [
      '/**',
      ` * @component ${compName}`,
      ' */\n',
    ];
  }

  if (useGlobalTokens && useGlobalTokens.length > 0) {
    dependencyAnnotaton.splice(
      dependencyAnnotaton.length - 1,
      0,
      ` * @useGlobalTokens ${JSON.stringify(useGlobalTokens.map((token) => `--${prefix}${lodash.kebabCase(token)}`))}`,
    );
  }

  return `${dependencyAnnotaton.join('\n')}${cssNames.join('')} {\n${varCodes.join('\n\n')}\n}`;
}

const isUnitlessNumber = {
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};

exports.valueAddPx = (name, value) => {
  if (typeof value !== 'number' || !value) {
    return value;
  }


  const index = Object.keys(isUnitlessNumber).findIndex((key) => name.toLowerCase().includes(key.toLowerCase()));

  if (index !== -1) {
    return value;
  }

  return `${value}px`;
};

exports.getCssVarType = (str) => {
  if (typeof str === 'string' && (str.startsWith('rgb') || str.startsWith('#'))) {
    return 'color';
  }

  if (typeof str === 'string' && str.endsWith('px')) {
    return 'size';
  }

  return 'input';
}
