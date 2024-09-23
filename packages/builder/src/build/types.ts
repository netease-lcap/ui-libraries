export interface BuildIdeOptions {
  configFile?: string;
  entry?: string;
  outDir?: string;
}

export interface Dependency {
  name: string;
  rootPath: string;
  config: (component: any) => any;
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
  dependencies?: Dependency[];
}

export interface LcapThemeOptions extends Partial<ThemeOptions> {
  themePreviewEntry?: string;
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

export const SupportedCSSProperties = [
  'backgroundColor' as const,
  'color' as const,
  'fontSize' as const,
  'borderTopColor' as const,
  'borderRightColor' as const,
  'borderBottomColor' as const,
  'borderLeftColor' as const,
  'borderTopWidth' as const,
  'borderRightWidth' as const,
  'borderBottomWidth' as const,
  'borderLeftWidth' as const,
  'borderTopStyle' as const,
  'borderRightStyle' as const,
  'borderBottomStyle' as const,
  'borderLeftStyle' as const,
  'borderTopLeftRadius' as const,
  'borderTopRightRadius' as const,
  'borderBottomRightRadius' as const,
  'borderBottomLeftRadius' as const,
  'width' as const,
  'height' as const,
  'marginTop' as const,
  'marginRight' as const,
  'marginBottom' as const,
  'marginLeft' as const,
  'paddingTop' as const,
  'paddingRight' as const,
  'paddingBottom' as const,
  'paddingLeft' as const,
];

export type SupportedCSSProperty = (typeof SupportedCSSProperties)[number];

export interface CSSValue {
  defaultValue: string;
  important?: boolean;
}

export interface CSSRule<V = CSSValue> {
  // key: string; // 目前发现用处不大
  selector: string;
  description: string;
  // code?: string;
  parsedStyle?: Partial<Record<SupportedCSSProperty, V>>;
}
