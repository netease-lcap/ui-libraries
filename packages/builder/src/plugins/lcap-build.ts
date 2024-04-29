import type { Plugin } from 'vite';
import { lcapBuild } from '../build';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
}

export interface ViteLcapPluginOptions {
  type?: 'extension' | 'nasl.ui';
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
  i18n?: { [lang: string]: string };
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
