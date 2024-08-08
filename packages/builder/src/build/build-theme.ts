import { loadConfigFromFile, build } from 'vite';
import fs from 'fs-extra';
import genThemeConfig, { ThemeConfig } from './gens/gen-theme-config';
import { themePath } from '../constants/input-paths';
import logger from '../utils/logger';
import type { LcapBuildOptions } from './types';

export async function viteBuildTheme(themeConfig: ThemeConfig) {
  const loadResult = await loadConfigFromFile({ command: 'build', mode: 'production' });
  if (!loadResult || !loadResult.config) {
    logger.error('未找到 vite 配置文件');
    return;
  }

  const { config } = loadResult;

  let entry;
  if (config.build && config.build.lib) {
    entry = config.build.lib.entry;
    delete config.build.lib;
  }

  config.plugins = config.plugins?.flat();
  const index = config.plugins?.findIndex((p: any) => p && p.name === 'vite:lcap-build');

  if (index && index !== -1) {
    config.plugins?.splice(index, 1);
  }
  config.plugins?.push({
    name: 'vite:lcap-theme-html',
    async transformIndexHtml(html, ctx) {
      return html.replace('\'[THEME INFO HERE]\'', JSON.stringify({
        previewPages: themeConfig.previewPages,
        components: themeConfig.components.map((c) => ({ name: c.name, title: c.title, group: c.group })),
      }));
    },
  });

  if (!config.build) {
    config.build = {};
  }

  if (!config.build.outDir) {
    config.build.outDir = 'dist-theme';
  }

  config.build.outDir = `${config.build.outDir}/theme`;
  config.build.rollupOptions = {
    ...(config.build.rollupOptions || {}),
    input: themePath,
    external: [],
  };

  if (!config.resolve) {
    config.resolve = {};
  }

  if (!Array.isArray(config.resolve.alias)) {
    config.resolve.alias = {
      ...config.resolve.alias,
      vue: 'vue/dist/vue.esm.js',
    };
  } else {
    config.resolve.alias.push({
      find: 'vue',
      replacement: 'vue/dist/vue.esm.js',
    });
  }

  config.build.sourcemap = false;
  config.build.minify = 'esbuild';
  config.build.emptyOutDir = false;
  config.publicDir = '';
  config.build.assetsDir = '';
  config.base = './';

  await build({
    configFile: false,
    envFile: false,
    ...config,
  });
}

export async function buildTheme(options: LcapBuildOptions) {
  const themeConfig = genThemeConfig({
    components: options.components || [],
    themeVarCssPath: options.theme.themeVarCssPath || '',
    themeComponentFolder: options.theme.themeComponentFolder || '',
    previewPages: options.theme.previewPages || [],
    oldCssVarPath: options.theme.oldCssVarPath,
    findThemeType: options.theme.findThemeType,
    type: options.type,
  }, options.framework);

  if (!themeConfig || !themeConfig.components || themeConfig.components.length === 0) {
    return;
  }

  logger.start('开始构建 theme');
  await fs.writeJSON(`${options.destDir}/theme.config.json`, themeConfig, { spaces: 2 });
  logger.success('生成 theme.config.json 成功！');

  await viteBuildTheme(themeConfig);
  logger.success('构建theme 成功');
}
