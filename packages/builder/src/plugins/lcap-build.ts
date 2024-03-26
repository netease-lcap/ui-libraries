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
  return {
    name: 'vite:lcap-build',
    async closeBundle() {
      await lcapBuild(options);
    },
  } as Plugin;
};
