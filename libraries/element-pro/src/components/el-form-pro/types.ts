import { ComputedRef } from '@vue/composition-api';

export type LayoutMode = 'linear' | 'grid';

export interface InitFieldOptions {
  name: string;
  value?: any,
  change?: (v: any) => void;
}
export interface FormFieldOptions {
  name: string;
  value?: any;
}
export interface FormField {
  name: string;
  setValue: (v: any) => void;
  getValue?: () => any;
  setInitalValue?: (v: any) => void;
  setChangeListener?: (listener: (v: any) => void) => void;
}

export interface FormRangeField {
  uid,
  name: [string, string],
  setValue: (index: number, v: any) => void;
  getValue?: (index: number) => any;
  setInitalValue?: (v: [any, any]) => void;
  setChangeListener: (startListener: (v: any) => void, endListener: (v: any) => void) => void;
}

export interface FormRangeFieldOptions {
  uid: string;
  name: [string, string];
  value: [any, any];
}

export interface FormExtendsContext {
  labelEllipsis: ComputedRef<boolean>;
  labelWidth: ComputedRef<string>;
  setFieldValue: (name: string, value: any) => void,
  initField: (options: InitFieldOptions) => void,
  initFormField: (options: FormFieldOptions) => FormField;
  initFormRangeField: (options: FormRangeFieldOptions) => FormRangeField;
  removeField: (name: string, deleteFieldValue?: boolean) => void,
  getFieldValue: (name: string) => any,
}

export interface FormItemExtendsContext {
  name: ComputedRef<string>;
}
