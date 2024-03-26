import fs from 'fs-extra';
import genThemeConfig from './gen-theme-config';
import { buildTheme as viteBuildTheme } from './vite-build-theme';
import logger from '../utils/logger';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
}

export interface LcapBuildOptions {
  type: 'extension' | 'nasl.ui';
  framework: 'react' | 'vue2' | 'taro' | 'vue3',
  components?: Array<{ group: string, title: string, name: string }>,
  theme: LcapThemeOptions,
}

export async function buildTheme(options: LcapBuildOptions) {
  if (!options.theme.themeVarCssPath || !fs.existsSync(options.theme.themeVarCssPath)) {
    logger.warn('未找到主题变量文件，不构建 theme');
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
  await fs.writeJSONSync('dist-theme/theme.config.json', themeConfig, { spaces: 2 });
  logger.start('开始构建 theme');

  await viteBuildTheme(themeConfig);
  logger.success('构建theme 成功');
}

export async function lcapBuild(options: LcapBuildOptions) {
  await buildTheme(options);
}
