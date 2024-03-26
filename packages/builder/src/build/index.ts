import fs from 'fs-extra';
import path from 'path';
import genThemeConfig from './gen-theme-config';
import { buildTheme as viteBuildTheme } from './vite-build-theme';
import logger from '../utils/logger';
import genNaslUIConfig from './gen-nasl-ui';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
}

export interface LcapBuildOptions {
  rootPath: string;
  type: 'extension' | 'nasl.ui';
  framework: 'react' | 'vue2' | 'taro' | 'vue3',
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>,
  i18n?: {[lang: string]: string}
  theme: LcapThemeOptions,
  destDir: string;
}

export async function buildTheme(options: LcapBuildOptions) {
  if (!options.theme.themeVarCssPath || !fs.existsSync(options.theme.themeVarCssPath)) {
    return;
  }

  logger.start('开始生成 theme.config.json...');
  const themeConfig = genThemeConfig({
    components: options.components || [],
    themeVarCssPath: options.theme.themeVarCssPath || '',
    themeComponentFolder: options.theme.themeComponentFolder || '',
    previewPages: options.theme.previewPages || [],
  });

  logger.success('生成 theme.config.json 成功！');
  await fs.writeJSONSync(`${options.destDir}/theme.config.json`, themeConfig, { spaces: 2 });
  logger.start('开始构建 theme');

  await viteBuildTheme(themeConfig);
  logger.success('构建theme 成功');
}

export function buildNaslUI(options: LcapBuildOptions) {
  if (options.type !== 'nasl.ui') {
    return;
  }

  logger.start('开始生成 nasl.ui.json...');
  const naslUIConfig = genNaslUIConfig({
    rootPath: options.rootPath,
    framework: options.framework,
    components: options.components,
    assetsPublicPath: options.assetsPublicPath,
  });

  if (!options.components) {
    options.components = naslUIConfig.map(({ name, group, title }) => ({ name, group, title }));
  }

  logger.success('生成 nasl.ui.json 成功！');
  fs.writeJSONSync(`${options.destDir}/nasl.ui.json`, naslUIConfig, { spaces: 2 });
}

export function buildI18N(options: LcapBuildOptions) {
  const {
    rootPath,
    i18n,
  } = options;

  if (!i18n) {
    return;
  }

  const langs = Object.keys(i18n);
  if (!langs || langs.length === 0) {
    logger.warn('未找到i18n 配置文件');
    return;
  }

  const data = {};

  langs.forEach((key) => {
    data[key] = fs.readJSONSync(path.join(rootPath, i18n[key]));
  });

  const destDir = path.join(rootPath, options.destDir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/i18n.json`;
  fs.writeJSONSync(destFile, data, { spaces: 2 });
}

export async function lcapBuild(options: LcapBuildOptions) {
  if (!options.destDir) {
    options.destDir = 'dist-theme';
  }
  buildNaslUI(options);
  await buildTheme(options);
  buildI18N(options);
}
