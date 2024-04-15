import { loadConfigFromFile, build } from 'vite';
import logger from '../utils/logger';
import type { ThemeConfig } from './gen-theme-config';
import { themePath } from '../constants/input-paths';

export async function buildTheme(themeConfig: ThemeConfig) {
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
  config.resolve.alias = {
    ...config.resolve.alias,
  };

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
