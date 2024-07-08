export interface BuildIdeOptions {
  configFile?: string;
  entry?: string;
  outDir?: string;
}

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  useOldCssVarParser?: boolean;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
  findThemeType?: 'theme' | 'component';
}

export interface LcapBuildOptions {
  rootPath: string;
  type: 'extension' | 'nasl.ui';
  framework: 'react' | 'vue2' | 'taro' | 'vue3',
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>,
  i18n?: boolean | {[lang: string]: string}
  theme: LcapThemeOptions,
  ide?: BuildIdeOptions,
  destDir: string;
  pnpm?: boolean;
}
