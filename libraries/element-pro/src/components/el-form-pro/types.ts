import { ComputedRef } from '@vue/composition-api';

export type LayoutMode = 'linear' | 'grid';

export interface InitFieldOptions {
  name: string;
  value?: any,
  change?: (v: any) => void;
}

export interface FormExtendsContext {
  labelEllipsis: ComputedRef<boolean>;
  labelWidth: ComputedRef<string>;
  setFieldValue: (name: string, value: any) => void,
  initField: (options: InitFieldOptions) => void,
  removeField: (name: string, deleteFieldValue?: boolean) => void,
  getFieldValue: (name: string) => any,
}

export interface FormItemExtendsContext {
  name: ComputedRef<string>;
}
