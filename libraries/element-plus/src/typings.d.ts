declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.vue' {
  type VueComponentOptions = any;
  const options: VueComponentOptions;
  export default options;
}

declare namespace nasl.ui {
  export interface IDEExtraInfoOptions {
    show?: boolean;
    ignore?: boolean;
    extends?: Array<string | { name: string, excludes?: string[] }>;
    order?: number;
    ideusage?: {
      order?: number; /* 组件排序，默认 6 */
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    }
  }

  export function IDEExtraInfo(options?: IDEExtraInfoOptions): (target: any) => void;
}
