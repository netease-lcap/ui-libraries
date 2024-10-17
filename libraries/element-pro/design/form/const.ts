import { AllValidateResult, FormRule, ValidateResultType } from '../form/type';

// 允许 Form 统一控制的表单
export const FORM_CONTROL_COMPONENTS = [
  'ElInput',
  // 'ElInputNumber', 组件已重构为 composition-api，这里的设置已失效，故而去除
  'ElTextarea',
  'ElCascader',
  'ElSelect',
  'ElOption',
  'ElSwitch',
  'ElCheckbox',
  'ElCheckboxGroup',
  'ElRadio',
  'ElRadioGroup',
  'ElTreeSelect',
  'ElDatePicker',
  'ElTimePicker',
  'ElUpload',
  'ElTransfer',
  'ElSlider',
];

export type ErrorListType =
  | {
      result: false;
      message: string;
      type: 'error' | 'warning';
    }
  | ValidateResultType;
export type SuccessListType =
  | {
      result: true;
      message: string;
      type: 'success';
    }
  | ValidateResultType;

export interface AnalysisValidateResult {
  successList?: SuccessListType[];
  errorList?: ErrorListType[];
  rules: FormRule[];
  resultList: AllValidateResult[];
  allowSetValue: boolean;
}
