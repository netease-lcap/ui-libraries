import path from 'path';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { Plugin } from 'vite';
import { camelCase, upperFirst } from 'lodash';
import {
  virtualThemeCSSFileId,
  virtualThemeComponentStoriesFileId,
  virtualThemePagePreviewFileId,
  virtualThemeEntryFileId,
  virtualThemePreviewWrapFileId,
} from '../constants/virtual-file-names';
import { themePath } from '../constants/input-paths';

export interface LcapCodeGenOption {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  previewPages?: Array<{ name: string; title: string }>;
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
}

const defaultOptions = {
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
};

function genVarCssCode(themeVarCssPath, componentFolder) {
  const cssVars = [
    themeVarCssPath,
  ];

  const varFiles = glob.sync('*/vars.css', { cwd: componentFolder, absolute: true });
  if (varFiles.length > 0) {
    cssVars.push(...varFiles);
  }

  const code = cssVars.map((filePath) => `@import '${filePath}';`).join('\n');
  return code;
}

function genComponentStoriesCode(componentFolder, framework) {
  const imports: string[] = [
    `import createComponentPreview from '${path.resolve(__dirname, `../../input/${framework}/createComponentPreview`)}';`,
  ];
  const stories: string[] = ['const stories = ['];

  const previewFiles = glob.sync('*/index.{tsx,ts,jsx,js,vue}', { cwd: componentFolder, absolute: true });
  previewFiles.forEach((filePath) => {
    const compPath = filePath.substring(0, filePath.lastIndexOf('/'));
    const compName = compPath.substring(compPath.lastIndexOf('/') + 1);
    const varName = upperFirst(camelCase(compName));

    imports.push(`import ${varName} from '${filePath}';`);

    stories.push(
      `{ demo: ${varName}, name: '${compName}' },`,
    );
  });

  stories.push('];');

  return [
    imports.join('\n'),
    stories.join('\n'),
    'export const demos = stories;',
    'export default createComponentPreview(stories);',
  ].join('\n\n');
}

function genThemePagePreviewMapCode(componentFolder, previewPages: Array<{ name: string; title: string }> = []) {
  const importCodes: string[] = [];
  const exportCodes: string[] = [];

  previewPages.forEach(({ name }) => {
    importCodes.push(`import ${name} from '${path.resolve(componentFolder, `../previews/${name}`)}';`);
    exportCodes.push(`  ${name},`);
  });

  exportCodes.unshift('export default {');
  exportCodes.push('};');

  return [
    importCodes.join('\n'),
    exportCodes.join('\n'),
  ].join('\n\n');
}

function genThemeEntryCode(framework) {
  if (framework === 'vue2') {
    return [
      'import Vue from \'vue\';',
      `import App from '${path.resolve(__dirname, '../../input/vue2/App')}';`,
      'Vue.config.productionTip = false;',
      'const app = new Vue({ ...App });',
      'app.$mount("#app");',
    ].join('\n');
  }

  const importCodes: string[] = [
    'import React from \'react\';',
    'import ReactDOM from \'react-dom/client\'',
    `import App from '${path.resolve(__dirname, '../../input/react/App')}';`,
  ];

  const bodyCodes: string[] = [
    'const root = ReactDOM.createRoot(document.getElementById("app"));',
    'root.render(React.createElement(App, {}))',
  ];

  return [
    importCodes.join('\n'),
    bodyCodes.join('\n'),
  ].join('\n\n');
}

function genThemePagePreviewWrapCode(componentFolder, framework) {
  let filePath = '';
  const index = [
    '.js',
    '.jsx',
    '.tsx',
  ].findIndex((ext) => {
    filePath = path.resolve(componentFolder, `../index${ext}`);

    if (fs.existsSync(filePath)) {
      return true;
    }

    return false;
  });

  if (index === -1) {
    if (framework === 'vue2') {
      return [
        'export const renderAppPreview = (app) => app;',
        'export const ComponentWrap = {',
        '  name: "ThemeComponentWrap",',
        '  props: ["demo", "actived", "title", "name"],',
        '  render(h) {',
        '    return h("div", { on: this.$listeners }, [h(this.demo)])',
        '  }',
        '}',
      ].join('\n');
    }

    return [
      'import React from \'react\'',
      '',
      'export const renderAppPreview = (app) => app;',
      'export const ComponentWrap = (props) => React.createElement(\'div\', { onClick: props.onClick, id: props.id }, props.demo);',
    ].join('\n');
  }

  return [
    `export { renderAppPreview, ComponentWrap } from '${filePath}';`,
  ].join('\n');
}

export default (options: LcapCodeGenOption = {}) => {
  const cwd = process.cwd();
  let themeId;
  const themeVarCssPath = path.resolve(cwd, options.themeVarCssPath || defaultOptions.themeVarCssPath);
  const componentFolder = path.resolve(cwd, options.themeComponentFolder || defaultOptions.themeComponentFolder);

  return {
    name: 'vite-lcap:code-gen', // 必须的，将会在 warning 和 error 中显示
    enforce: 'pre',
    configResolved(config) {
      themeId = `${config.root}/index.html`;
    },
    resolveId(source) {
      if (source === virtualThemeCSSFileId) {
        return virtualThemeCSSFileId;
      }

      if (source === virtualThemeComponentStoriesFileId) {
        return virtualThemeComponentStoriesFileId;
      }

      if (source === virtualThemePagePreviewFileId) {
        return virtualThemePagePreviewFileId;
      }

      if (source === virtualThemeEntryFileId) {
        return virtualThemeEntryFileId;
      }

      if (source === virtualThemePreviewWrapFileId) {
        return virtualThemePreviewWrapFileId;
      }

      if (source === themePath) {
        return themeId;
      }

      return undefined;
    },
    load: (id) => {
      if (id.indexOf('_util/PurePanel') !== -1) {
        console.log(id);
      }
      if (id === virtualThemeCSSFileId) {
        return genVarCssCode(themeVarCssPath, componentFolder);
      }

      if (id === virtualThemeComponentStoriesFileId) {
        return genComponentStoriesCode(componentFolder, options.framework);
      }

      if (id === virtualThemePagePreviewFileId) {
        return genThemePagePreviewMapCode(componentFolder, options.previewPages);
      }

      if (id === virtualThemePreviewWrapFileId) {
        return genThemePagePreviewWrapCode(componentFolder, options.framework);
      }

      if (id === virtualThemeEntryFileId) {
        return genThemeEntryCode(options.framework);
      }

      if (id === themeId) {
        return fs.readFileSync(
          themePath,
          'utf-8',
        );
      }

      return undefined;
    },
  } as Plugin;
};
