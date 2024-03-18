import type { Plugin } from 'vite';
import fs from 'fs-extra';
import genThemeConfig from '../build/gen-theme-config';
import { buildTheme } from '../build/vite-build-theme';
import logger from '../utils/logger';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  previewPages?: Array<{ name: string; title: string }>;
}

export interface ViteLcapPluginOptions {
  type?: 'extension' | 'nasl.ui';
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
  components?: Array<{ group: string, title: string, name: string }>,
  theme?: LcapThemeOptions,
}

export default (options: ViteLcapPluginOptions = {}) => {
  return {
    name: 'vite:lcap-build',
    async closeBundle() {
      logger.start('开始生成 theme.config.json...');
      const themeConfig = genThemeConfig({
        components: options.components || [],
        themeVarCssPath: options.theme?.themeVarCssPath || '',
        themeComponentFolder: options.theme?.themeComponentFolder || '',
        previewPages: options.theme?.previewPages || [],
      });

      logger.success('生成 theme.config.json 成功！');
      await fs.writeJSONSync('dist-theme/theme.config.json', themeConfig, { spaces: 2 });
      logger.start('开始构建 theme');

      await buildTheme(themeConfig);
      logger.success('构建theme 成功');
    },
  } as Plugin;
};
