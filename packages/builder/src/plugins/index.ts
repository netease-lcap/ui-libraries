import path from 'path';
import fs from 'fs-extra';
import LcapCodeGen from './lcap-code-gen';
import LcapBuild from './lcap-build';
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
    type: 'nasl.ui',
    framework: 'react',
    ...options,
    theme: {
      ...DEFAULT_THEME_OPTIONS,
      ...(options.theme || {}),
    },
  };

  if (pluginOption.theme) {
    pluginOption.theme.themeVarCssPath = path.resolve(cwd, pluginOption.theme.themeVarCssPath || '');
    pluginOption.theme.themeComponentFolder = path.resolve(cwd, pluginOption.theme.themeComponentFolder || '');
  }

  const lcapConfigPath = path.resolve(cwd, './lcap-ui.config.js');
  if ((!pluginOption.components || pluginOption.components.length === 0) && fs.existsSync(lcapConfigPath)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const config = require(lcapConfigPath);
    pluginOption.components = (config.components || []).map((c) => ({
      group: c.group,
      title: c.alias,
      name: c.name,
      show: c.show,
    }));
  }

  return [
    LcapCodeGen({
      ...pluginOption.theme,
      framework: pluginOption.framework,
    }),
    LcapBuild(pluginOption),
  ];
};
