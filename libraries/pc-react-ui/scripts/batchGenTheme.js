const fs = require('fs-extra');
const path = require('path');
const lodash = require('lodash');
const tokenMeta = require('antd/es/version/token-meta.json');
const componentToken = require('antd/es/version/token.json');
const lcapUIConfig = require('../lcap-ui.config');
const defaultToken = require('./defaultToken.json');

const { genCssVarCode, valueAddPx, getCssVarType } = require('./utils');

const cwd = process.cwd();
const componentFolderPath = path.resolve(cwd, 'src/theme/components');
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
  'Row': 'Grid',
  'DateRangePicker': 'DatePicker'
};

async function genComponentVars(name) {
  const compPath = path.resolve(componentFolderPath, name);

  if (!tokenMeta.components[name] && (!componentAntMap[name] || !tokenMeta.components[componentAntMap[name]])) {
    console.log('Ant Design Token 中找不到组件', name);
    return;
  }

  const compThemePath = `${compPath}`;
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

  await fs.writeFile(themeVarPath, genCssVarCode(vars, mapName || name, compDefaultToken.global));
}

async function genComponentThemePreview(name) {
  const compPath = path.resolve(componentFolderPath, name);
  const compThemePath = `${compPath}`;
  if (!fs.existsSync(compThemePath)) {
    await fs.mkdir(compThemePath, { recursive: true });
  }

  const themePreviewPath = `${compThemePath}/index.tsx`;
  const mapName = componentAntMap[name];

  if (!fs.existsSync(`${cwd}/node_modules/antd-token-previewer/es/previews/components/${mapName || name}`)) {
    console.log('找不到 ant design token preview', mapName || name);
    return;
  }

  if (fs.existsSync(themePreviewPath)) {
    console.log(name, 'theme/index.jsx 已存在，无需重复创建');
    return;
  }

  const themePreviewCode = [
    `import React from 'react';`,
    `import { Space } from 'antd';`,
    `import PreviewDemos from 'antd-token-previewer/es/previews/components/${lodash.lowerFirst(mapName || name)}';`,
    '',
    'export default () => {',
    '  return (',
    '    <Space direction="vertical" style={{ width: \'100%\' }} size={24}>',
    '      {...PreviewDemos.map(({ demo }) => demo)}',
    '    </Space>',
    '  );',
    '};',
    '',
  ].join('\n');
  await fs.writeFileSync(themePreviewPath, themePreviewCode);
}

(async function() {
  await genGlobalVars();
  for (let i = 0; i < lcapUIConfig.components.length; i++) {
    const compInfo = lcapUIConfig.components[i];

    if (compInfo && compInfo.name) {
      await genComponentVars(compInfo.name);
      await genComponentThemePreview(compInfo.name);
    }
  }
})();
