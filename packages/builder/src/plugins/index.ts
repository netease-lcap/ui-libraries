import path from 'path';
import LcapThemeCode from './lcap-theme-code';
import LcapBuild from './lcap-build';
import LcapDefaultConfig from './lcap-default-config';
import lcapUseNaslUI from './lcap-use-nasl-ui';
import type { LcapThemeOptions, ViteLcapPluginOptions } from './lcap-build';
import { getConfigComponents } from '../utils';

const DEFAULT_THEME_OPTIONS: LcapThemeOptions = {
  findThemeType: 'theme',
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
  themePreviewEntry: './src/theme/index',
  previewPages: [
    {
      name: 'dashboard',
      title: 'Dashboard',
    },
    {
      name: 'form',
      title: '表单页',
    },
  ],
};

const EXTENSION_DEFAULT_THEME_OPTIONS: LcapThemeOptions = {
  findThemeType: 'component',
  themeVarCssPath: '',
  themeComponentFolder: './src/components',
  themePreviewEntry: '',
  previewPages: [],
};

export default (options: ViteLcapPluginOptions = {}) => {
  const cwd = process.cwd();
  const isExtension = options.type && options.type === 'extension';
  const defaultPublicPath = isExtension ? 'https://static-vusion.163yun.com/packages/extension' : 'https://static-vusion.163yun.com/packages';
  const defaultThemeOptions = isExtension ? EXTENSION_DEFAULT_THEME_OPTIONS : DEFAULT_THEME_OPTIONS;
  const pluginOption: ViteLcapPluginOptions = {
    rootPath: cwd,
    type: 'nasl.ui',
    framework: 'react',
    assetsPublicPath: defaultPublicPath,
    destDir: 'dist-theme',
    ...options,
    theme: {
      ...defaultThemeOptions,
      ...(options.theme || {}),
    },
  };

  if (pluginOption.type === 'extension' && pluginOption.theme) {
    pluginOption.theme.previewPages = [];
  }

  if (pluginOption.theme) {
    pluginOption.theme.themeVarCssPath = pluginOption.theme.themeVarCssPath ? path.resolve(cwd, pluginOption.theme.themeVarCssPath || '') : '';
    pluginOption.theme.themeComponentFolder = path.resolve(cwd, pluginOption.theme.themeComponentFolder || '');
  }

  if (!pluginOption.components || pluginOption.components.length === 0) {
    pluginOption.components = getConfigComponents(cwd);
  }

  return [
    LcapDefaultConfig({
      framework: pluginOption.framework as string,
      destDir: pluginOption.destDir as string,
      type: pluginOption.type as any,
      rootPath: pluginOption.rootPath as any,
    }),
    lcapUseNaslUI({
      framework: pluginOption.framework as string,
      destDir: pluginOption.destDir as string,
      type: pluginOption.type as any,
      rootPath: pluginOption.rootPath as any,
    }),
    LcapThemeCode({
      ...pluginOption.theme,
      framework: pluginOption.framework,
      type: pluginOption.type,
      dependencies: options.dependencies,
    }),
    LcapBuild(pluginOption),
  ];
};
