export type BuildMode = 'production' | 'watch';

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

export interface DepCompListInfo {
  compName: string;
  isResetRoot: boolean;
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
  reportCSSInfo?: {
    enabled: true; // 为 true 时才会构建 index-css-info-map.json
    verbose?: true; // 开启后会打印"有选择器没对应组件、有组件没有选择器"的情况，防止遗漏信息，对新组件库调试很有用
    extraComponentMap?: Record<string, { // 额外的组件配置，key 为组件大驼峰名称
      /**
       * 补充组件相关的选择器前缀
       * key 为前缀名，value 表示是否为根节点
       * 一般有以下情况：
       * - build 后的 CSS 中有组件信息，但前缀不匹配组件名，需要手动补充前缀
       *   @example: 表格需要补充 u-table 前缀的选择器：UTableView: { selectorPrefixMap: { 'u-table': false } }
       * - 组件前缀不是默认的根节点，需要切换
       *   @example: 目录组件根节点是 _wrap，需要互换：UToc: { selectorPrefixMap: { 'u-toc': false, 'u-toc_wrap': true } }
       * - 优先让子组件匹配选择器
       *   @example: DropDownItem 不是按主组件的命名方式，按照 BEM 会识别成主组件的节点，需要显式给子组件声明出来：ElDropdownItem: { selectorPrefixMap: { 'el-dropdown-menu__item': true } }
       */
      selectorPrefixMap?: Record<string, boolean>;
      /**
       * 补充主选择器
       * key 为选择器，value 表示是否为根节点
       * 一般是因为 rule 是空的，build 后的 CSS 被压缩没了。需要手动补充选择器信息
       * @example: 表单本身没有样式，UForm: { mainSelectorMap: { "[class*=u-form___]": true } }
       */
      mainSelectorMap?: Record<string, boolean>;
      /**
       * 额外补充依赖组件
       * 比如 UTreeSelectNew依赖了UTreeViewNew，需要补充UTreeViewNew
       */
      depCompList?: Array<string | DepCompListInfo>;
      /**
       * 需要隐藏的选择器前缀列表
       */
      hiddenSelectorPreFixList?: Array<string>;
    }>;
    inferSelectorComponentName?: (selector: string, componentNameMap: Record<string, string | undefined>) => string | undefined; // 重写推断选择器是哪个组件的方法。很复杂！建议优先走上面的配置
    isSelectorStartRoot?: (selector: string, componentName: string, parentName: string | undefined) => boolean; // 重写判断选择器是否是根节点。很复杂！建议优先走上面的配置
};
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
  isStartRoot: boolean;
  description: string;
  // code?: string;
  parsedStyle?: Partial<Record<SupportedCSSProperty, V>>;
}
