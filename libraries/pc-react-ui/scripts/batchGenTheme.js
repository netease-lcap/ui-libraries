const fs = require('fs-extra');
const path = require('path');
const lodash = require('lodash');
const tokenMeta = require('antd/es/version/token-meta.json');
const componentToken = require('antd/es/version/token.json');
const lcapUIConfig = require('../lcap-ui.config');
const defaultToken = require('./defaultToken.json');

const { genCssVarCode, valueAddPx, getCssVarType } = require('./utils');

const cwd = process.cwd();
const componentFolderPath = path.resolve(cwd, 'src/components');
const themePath = path.resolve(cwd, 'src/theme');

const globalVars = Object.keys(tokenMeta.global).map((name) => {
  const info = tokenMeta.global[name];
  let value = defaultToken[name];

  if (info.type === 'number') {
    value = valueAddPx(name, value);
  }

  return {
    name,
    title: info.name,
    desc: info.desc,
    type: getCssVarType(value),
    value,
  };
});

async function genGlobalVars() {
  if (!fs.existsSync(themePath)) {
    await fs.mkdir(themePath, { recursive: true });
  }
  const themeVarPath = `${themePath}/vars.css`;

  if (fs.existsSync(themeVarPath)) {
    console.log('global', 'vars.css 已存在，无需重复创建');
    return;
  }

  fs.writeFile(themeVarPath, genCssVarCode(globalVars));
};

const componentAntMap = {
  'Text': 'Typography',
  'Link': 'Typography',
  'Textarea': 'Input',
  'CheckboxGroup': 'Checkbox',
  'RadioGroup': 'Radio',
  'DateRangePicker': 'DatePicker'
};

async function genComponentVars(name) {
  const compPath = path.resolve(componentFolderPath, name);
  if (!fs.existsSync(compPath)) {
    console.log('找不到组件文件夹', compPath);
    return;
  }

  if (!tokenMeta.components[name] && (!componentAntMap[name] || !tokenMeta.components[componentAntMap[name]])) {
    console.log('Ant Design 中找不到组件', name);
    return;
  }

  const compThemePath = `${compPath}/theme`;
  if (!fs.existsSync(compThemePath)) {
    await fs.mkdir(compThemePath, { recursive: true });
  }

  const themeVarPath = `${compThemePath}/vars.css`;
  if (fs.existsSync(themeVarPath)) {
    console.log(name, 'vars.css 已存在，无需重复创建');
    return;
  }

  const mapName = componentAntMap[name];
  const compTokenMeta = tokenMeta.components[name] || tokenMeta.components[mapName];
  const compDefaultToken = componentToken[name] || componentToken[mapName];

  const vars = compTokenMeta.map((info) => {
    let value = compDefaultToken.component[info.token];
    value = valueAddPx(info.token, value);

    return {
      name: info.token,
      desc: info.desc,
      title: info.name || '',
      type: getCssVarType(value),
      value,
    };
  });

  fs.writeFile(themeVarPath, genCssVarCode(vars, mapName || name, compDefaultToken.global));
}


(async function() {
  await genGlobalVars();
  for (let i = 0; i < lcapUIConfig.components.length; i++) {
    const compInfo = lcapUIConfig.components[i];

    if (compInfo && compInfo.name) {
      genComponentVars(compInfo.name);
    }
  }
})();
