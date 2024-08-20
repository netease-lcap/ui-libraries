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
    ideusage?: {
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    }
  }

  export function IDEExtraInfo(options?: IDEExtraInfoOptions): (target: any) => void;

  export class ValidateResult {
    rawValue: string;

    value: string;

    trigger: string;

    muted: string;

    valid: boolean;

    touched: boolean;

    dirty: boolean;

    firstError: string;
  }

  export type BaseEvent = any;
  export interface StringLiteral<T> {
    _value: T;
  }
}
