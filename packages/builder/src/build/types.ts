export interface BuildIdeOptions {
  configFile?: string;
  entry?: string;
  outDir?: string;
}

export interface ThemeOptions {
  themeVarCssPath: string;
  themeComponentFolder: string;
  type: string;
  previewPages: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
  /* 使用旧的css var 解析方式（兼容 pc-ui, mobile-ui） */
  oldCssVarPath?: string;
  components: Array<{ group: string, title: string, name: string, [key: string]: any }>;
    /* 找 theme文件的方式， theme, 在src/theme里， 在 component/theme */
  findThemeType?: 'theme' | 'component';
}

export interface LcapThemeOptions extends Partial<ThemeOptions> {
  themePreviewEntry?: string;
}

export interface Dependency {
  name: string;
  rootPath: string;
  config: (component: any) => any;
}

export interface LcapBuildOptions {
  rootPath: string;
  type: 'extension' | 'nasl.ui';
  framework: 'react' | 'vue2' | 'taro' | 'vue3',
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>;
  i18n?: boolean | {[lang: string]: string};
  theme: LcapThemeOptions;
  ide?: BuildIdeOptions;
  destDir: string;
  pnpm?: boolean;
  dependencies?: Dependency[];
}
