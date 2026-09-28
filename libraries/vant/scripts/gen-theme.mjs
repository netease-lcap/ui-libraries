import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const root = process.cwd();
const themeCSSFolder = path.resolve(root, 'node_modules/vant/es');
const themeComponentFolder = path.resolve(root, 'src/theme/components');
const naslUIConfigPath = path.resolve(root, 'dist-theme/nasl.ui.json');

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

function getCSSVars(component) {
  const { kebabName } = component;
  const tagName = kebabName.replace(/^van-/, '');
  const cssFilePath = path.resolve(themeCSSFolder, `${tagName}/index.css`);
  const relativeCSSFilePath = `vant/es${cssFilePath.substring(themeCSSFolder.length)}`;
  if (!fs.existsSync(cssFilePath)) {
    console.log(`${tagName} css 文件不存在，${relativeCSSFilePath}`);
    return null;
  }
  let content = fs.readFileSync(cssFilePath, 'utf-8');

  if (component.children && component.children.length > 0) {
    component.children.forEach((child) => {
      const childTagName = child.kebabName.replace(/^van-/, '');
      const childCSSFilePath = path.resolve(themeCSSFolder, `${childTagName}/index.css`);
      if (fs.existsSync(childCSSFilePath)) {
        const childContent = fs.readFileSync(childCSSFilePath, 'utf-8');
        content += `\n${childContent}`;
      }
    });
  }

  const css = postcss.parse(content);
  const cssRules = css.nodes.filter((node) => (
    node.type === 'rule' && (
      node.selector.includes(':root')
      || node.selector.includes(':host')
    ) && node.nodes.find((node) => node.type === 'decl' && node.prop.startsWith('--'))
  ));

  if (!cssRules.length) {
    console.log(`.${tagName} css 规则不存在，${relativeCSSFilePath}`);
    return null;
  }

  const selectors = [];
  const variables = [];

  cssRules.forEach((rule) => {
    const arr = rule.selector.split(',');
    arr.forEach((item) => {
      const selector = item.replace(/\\n/g, '').trim();
      if (selectors.includes(selector)) {
        return;
      }
      selectors.push(selector);
    });

    rule.nodes.forEach((node) => {
      if (node.type === 'decl' && node.prop.startsWith('--') && !variables.some((v) => v.prop === node.prop)) {
        variables.push(node);
      }
    });
  });

  return {
    selector: selectors.join(',\n'),
    variables,
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

function genThemeFiles(tagName, component) {
  const cssVars = getCSSVars(component);
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

function readNaslUIConfig() {
  const config = JSON.parse(fs.readFileSync(naslUIConfigPath, 'utf-8'));
  return config;
}

function executeGenThemeFiles() {
  // fs.readdirSync(componentFolder).forEach((file) => {
  //   const stat = fs.statSync(path.resolve(componentFolder, file));
  //   if (stat.isDirectory() && !fs.existsSync(path.resolve(themeComponentFolder, file, 'vars.css'))) {
  //     genThemeFiles(file);
  //   }
  // });

  readNaslUIConfig().forEach((component) => {
    genThemeFiles(component.kebabName, component);
  });
}

executeGenThemeFiles();
