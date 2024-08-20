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

declare module '@lcap/element-pro' {
  export {};
}

declare namespace nasl.ui {
  export interface IDEExtraInfoOptions {
    show?: boolean;
    ideusage?: {
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    }
  }

  export function IDEExtraInfo(options?: IDEExtraInfoOptions): (target: any) => void;
}
