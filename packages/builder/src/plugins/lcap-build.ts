import type { Plugin } from 'vite';
import { lcapBuild } from '../build';
import type { BuildIdeOptions } from '../build/types';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  /* 使用旧的css var 解析方式（兼容 pc-ui, mobile-ui） */
  useOldCssVarParser?: boolean;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
  themePreviewEntry?: string;
  /* 找 theme文件的方式， theme, 在src/theme里， 在 component/theme */
  findThemeType?: 'theme' | 'component';
}

export interface ViteLcapPluginOptions {
  type?: 'extension' | 'nasl.ui';
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
  i18n?: boolean | { [lang: string]: string };
  ide?: BuildIdeOptions;
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string }>,
  theme?: LcapThemeOptions,
  rootPath?: string;
  destDir?: string;
}

export default (options: any) => {
  let disabled = false;
  return {
    name: 'vite:lcap-build',
    configResolved(config) {
      if (config.mode === 'test' || config.mode === 'serve') {
        disabled = true;
      }
    },
    async closeBundle() {
      if (disabled) {
        return;
      }
      await lcapBuild(options);
    },
  } as Plugin;
};
