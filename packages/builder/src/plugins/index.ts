import path from 'path';
import fs from 'fs-extra';
import LcapCodeGen from './lcap-code-gen';
import LcapBuild from './lcap-build';
import LcapConfig from './lcap-config';
import type { LcapThemeOptions, ViteLcapPluginOptions } from './lcap-build';

const DEFAULT_THEME_OPTIONS: LcapThemeOptions = {
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
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

export default (options: ViteLcapPluginOptions = {}) => {
  const cwd = process.cwd();
  const pluginOption: ViteLcapPluginOptions = {
    rootPath: cwd,
    type: 'nasl.ui',
    framework: 'react',
    assetsPublicPath: options.type && options.type === 'extension' ? 'https://static-vusion.163yun.com/packages/extension' : 'https://static-vusion.163yun.com/packages',
    destDir: 'dist-theme',
    ...options,
    theme: {
      ...DEFAULT_THEME_OPTIONS,
      ...(options.theme || {}),
    },
  };

  if (pluginOption.type === 'extension' && pluginOption.theme) {
    pluginOption.theme.previewPages = [];
  }

  if (pluginOption.theme) {
    pluginOption.theme.themeVarCssPath = path.resolve(cwd, pluginOption.theme.themeVarCssPath || '');
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
    }));
  }

  return [
    LcapConfig({
      framework: pluginOption.framework,
      destDir: pluginOption.destDir,
    }),
    LcapCodeGen({
      ...pluginOption.theme,
      framework: pluginOption.framework,
    }),
    LcapBuild(pluginOption),
  ];
};
