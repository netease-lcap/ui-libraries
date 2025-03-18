/* eslint-disable max-classes-per-file */
declare namespace nasl.ui {
  export class BaseEvent {}
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
}

declare namespace nasl.core {
  export class StringLiteral<T> {
    _value: T;
  }
}

declare namespace extensions {
  export interface ExtensionComponentOptions {
    type: 'pc' | 'h5' | 'both';
    show?: boolean;
    replaceNaslUIComponent?: string;
    extends?: any;
    sourceName?: string;
    ideusage?: {
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    };
  }

  export function ExtensionComponent(options?: ExtensionComponentOptions & Record<string, any>): (target: any) => void;
}
