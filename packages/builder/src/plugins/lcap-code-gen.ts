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
  type?: 'extension' | 'nasl.ui';
  rootPath?: string;
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  themePreviewEntry?: string;
  previewPages?: Array<{ name: string; title: string }>;
  findThemeType?: 'theme' | 'component';
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
}

const defaultOptions = {
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
};

function genVarCssCode({
  themeVarCssPath,
  themeComponentFolder: componentFolder,
  findThemeType,
}: LcapCodeGenOption) {
  const cssVars = [
    themeVarCssPath,
  ];

  const varsPath = findThemeType === 'component' ? '*/theme/vars.css' : '*/vars.css';
  const varFiles = glob.sync(varsPath, { cwd: componentFolder, absolute: true });
  if (varFiles.length > 0) {
    cssVars.push(...varFiles);
  }

  const code = cssVars.map((filePath) => `@import '${filePath}';`).join('\n');
  return code;
}

function genComponentStoriesCode({ themeComponentFolder: componentFolder, framework, findThemeType }: LcapCodeGenOption) {
  const imports: string[] = [
    `import createComponentPreview from '${path.resolve(__dirname, `../../input/${framework}/createComponentPreview`)}';`,
  ];
  const stories: string[] = ['const stories = ['];
  const previewFilePath = findThemeType === 'component' ? '*/theme/index.{tsx,ts,jsx,js,vue}' : '*/index.{tsx,ts,jsx,js,vue}';

  const previewFiles = glob.sync(previewFilePath, { cwd: componentFolder, absolute: true });
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

function genThemePagePreviewMapCode({ themeComponentFolder: componentFolder = '', previewPages = [] }: LcapCodeGenOption) {
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

function genThemeEntryCode({ framework }: LcapCodeGenOption) {
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

const InstallLibraryCode = `function installLibrary(Vue, Components) {
  const caseRE = /^[A-Z]/;
  const blackList = ['directives', 'filters', 'utils', 'mixins', 'blocks', 'vendors', 'install', 'default'];

  // 组件之间有依赖，有 install 的必须先安装
  Object.keys(Components).forEach((key) => {
      if (!caseRE.test(key)) { // 如果为大写则是组件
          if (!blackList.includes(key))
              console.error('不允许组件名首字母小写', key, Components[key]);
          return;
      }

      const Component = Components[key];
      if (Component.install) {
          Vue.component(key, Component);
          Component.install(Vue, key);
      }
  });
  Object.keys(Components).forEach((key) => {
      if (!caseRE.test(key)) { // 如果为大写则是组件
          if (!blackList.includes(key))
              console.error('不允许组件名首字母小写', key, Components[key]);
          return;
      }

      const Component = Components[key];
      Vue.component(key, Component);
      if (!Component.install) {
          Vue.component(key, Component);
      }
  });
}`;

function genDefaultPreviewCode({
  framework,
  type,
}: LcapCodeGenOption) {
  const isExtension = type === 'extension';
  const codes = [
    `export { default as ComponentWrap } from '${path.resolve(__dirname, `../../input/${framework}/component-preview`)}'`,
    'export const renderAppPreview = (app) => app;',
  ];

  if (framework && framework.startsWith('vue')) {
    codes.unshift('');
    codes.unshift([
      'import Vue from "vue"',
      'import * as Library from "@/index"',
      isExtension ? [InstallLibraryCode, 'installLibrary(Vue, Library);'] : 'Vue.use(Library)',
    ].join('\n'));
  }

  return codes.join('\n');
}

function genThemePagePreviewWrapCode(options: LcapCodeGenOption) {
  const { rootPath = '', themePreviewEntry } = options;

  if (themePreviewEntry) {
    let filePath = '';
    const index = [
      '.js',
      '.jsx',
      '.tsx',
    ].findIndex((ext) => {
      filePath = path.resolve(rootPath, themePreviewEntry, `../index${ext}`);

      if (fs.existsSync(filePath)) {
        return true;
      }

      return false;
    });

    if (index !== -1) {
      return [
        `export { renderAppPreview, ComponentWrap } from '${filePath}';`,
      ].join('\n');
    }
  }

  return genDefaultPreviewCode(options);
}

export default (options: LcapCodeGenOption = {}) => {
  const cwd = process.cwd();
  let themeId;
  const themeVarCssPath = path.resolve(cwd, options.themeVarCssPath || defaultOptions.themeVarCssPath);
  const componentFolder = path.resolve(cwd, options.themeComponentFolder || defaultOptions.themeComponentFolder);

  const genOptions: LcapCodeGenOption = {
    ...options,
    themeVarCssPath,
    themeComponentFolder: componentFolder,
    rootPath: cwd,
  };
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
      if (id === virtualThemeCSSFileId) {
        return genVarCssCode(genOptions);
      }

      if (id === virtualThemeComponentStoriesFileId) {
        return genComponentStoriesCode(genOptions);
      }

      if (id === virtualThemePagePreviewFileId) {
        return genThemePagePreviewMapCode(genOptions);
      }

      if (id === virtualThemePreviewWrapFileId) {
        return genThemePagePreviewWrapCode(genOptions);
      }

      if (id === virtualThemeEntryFileId) {
        return genThemeEntryCode(genOptions);
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
