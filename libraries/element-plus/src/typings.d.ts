declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';

declare module '*.vue' {
  type VueComponentOptions = any;
  const options: VueComponentOptions;
  export default options;
}

declare namespace nasl.ui {
  export interface IDEExtraInfoOptions {
    disableOverLoad?: boolean;
    show?: boolean;
    ignore?: boolean;
    extends?: Array<string | { name: string; excludes?: string[] }>;
    order?: number;
    ideusage?: {
      order?: number /* 组件排序，默认 6 */;
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    };
  }

  export function IDEExtraInfo(options?: IDEExtraInfoOptions): (target: any) => void;
}

declare namespace nasl.io {
  export interface File {
    name: string;
    size: number;
    type: string;
  }

  export interface FileInfo {
    status: string;
    url: string;
    name: string;
    size: number;
    type: string;
  }
}
