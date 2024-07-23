import path from 'path';
import fs from 'fs-extra';
import LcapCodeGen from './lcap-code-gen';
import LcapBuild from './lcap-build';
import LcapConfig from './lcap-config';
import type { LcapThemeOptions, ViteLcapPluginOptions } from './lcap-build';

const DEFAULT_THEME_OPTIONS: LcapThemeOptions = {
  findThemeType: 'theme',
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
  useOldCssVarParser: false,
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
  useOldCssVarParser: false,
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

  const lcapConfigPath = path.resolve(cwd, './lcap-ui.config.js');
  if ((!pluginOption.components || pluginOption.components.length === 0) && fs.existsSync(lcapConfigPath)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const config = require(lcapConfigPath);
    pluginOption.components = (config.components || []).map((c) => ({
      ...c,
      group: c.group,
      title: c.alias,
      name: c.name,
      show: c.show,
    }));
  }

  return [
    LcapConfig({
      framework: pluginOption.framework,
      destDir: pluginOption.destDir,
      rootPath: cwd,
    }),
    LcapCodeGen({
      ...pluginOption.theme,
      framework: pluginOption.framework,
      type: pluginOption.type,
    }),
    LcapBuild(pluginOption),
  ];
};
