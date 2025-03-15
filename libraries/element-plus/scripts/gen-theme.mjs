import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const root = process.cwd();
const themeCSSFolder = path.resolve(root, 'node_modules/element-plus/theme-chalk');
const componentFolder = path.resolve(root, 'src/components');
const themeComponentFolder = path.resolve(root, 'src/theme/components');

const themeVueFile = (tagName) => `<template>
  <demo-preview></demo-preview>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/${tagName}/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
`;

const css = postcss.parse(fs.readFileSync(path.resolve(themeCSSFolder, 'el-empty.css'), 'utf-8'));

fs.writeFileSync('test.json', JSON.stringify(css.nodes, null, 2));

function getCSSVars(tagName) {
  const cssFilePath = path.resolve(themeCSSFolder, `${tagName}.css`);
  const relativeCSSFilePath = `element-plus/theme-chalk${cssFilePath.substring(themeCSSFolder.length)}`;
  if (!fs.existsSync(cssFilePath)) {
    console.log(`${tagName} css 文件不存在，${relativeCSSFilePath}`);
    return null;
  }
  const css = postcss.parse(fs.readFileSync(cssFilePath, 'utf-8'));
  const cssRule = css.nodes.find((node) => (
    node.type === 'rule' && (
      node.selector === `.${tagName}`
      || node.selector.includes(`.${tagName},`)
    )
  ));

  if (!cssRule) {
    console.log(`.${tagName} css 规则不存在，${relativeCSSFilePath}`);
    return null;
  }

  return {
    selector: cssRule.selector,
    variables: cssRule.nodes.filter((node) => node.type === 'decl' && node.prop.startsWith('--')),
  };
}

const isColor = (name, value) => {
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba')) {
    return true;
  }

  if (value.startsWith('var(--') && ['color', 'bg', 'background'].some((key) => name.toLocaleLowerCase().includes(key))) {
    return true;
  }

  return false;
};

function genThemeFiles(tagName) {
  const cssVars = getCSSVars(tagName);
  if (!cssVars) {
    return;
  }

  if (cssVars.variables.length === 0) {
    console.log(`${tagName} 没有可用的 css 变量`);
    return;
  }

  const folder = path.resolve(themeComponentFolder, tagName);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const componentPath = path.resolve(folder, 'index.vue');
  fs.writeFileSync(componentPath, themeVueFile(tagName), 'utf-8');

  const cssPath = path.resolve(folder, 'vars.css');
  const cssCodes = [
    '/**',
    ` * @component ${tagName}`,
    ' */',
    `${cssVars.selector || ':root'} {`,
      ...cssVars.variables.map((v) => ([
        '  /**',
        `   * @type ${isColor(v.prop, v.value.trim()) ? 'color' : 'input'}`,
        '   */',
        `  ${v.prop}: ${v.value};`,
      ])).flat(),
    '}',
  ];

  fs.writeFileSync(cssPath, cssCodes.join('\n'), 'utf-8');
}

function executeGenThemeFiles() {
  fs.readdirSync(componentFolder).forEach((file) => {
    const stat = fs.statSync(path.resolve(componentFolder, file));
    if (stat.isDirectory() && !fs.existsSync(path.resolve(themeComponentFolder, file, 'vars.css'))) {
      genThemeFiles(file);
    }
  });
}

executeGenThemeFiles();
