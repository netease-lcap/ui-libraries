import { ComputedRef, InjectionKey } from '@vue/composition-api';
import { ElCheckboxProps } from './type';

export interface CheckboxGroupInjectData {
  handleCheckboxChange: (data: { checked: boolean; e: Event; option: ElCheckboxProps }) => void;
  onCheckedChange: (p: { checked: boolean; checkAll: boolean; e: Event; option: ElCheckboxProps }) => void;
}

export const CheckboxGroupInjectionKey: InjectionKey<ComputedRef<CheckboxGroupInjectData>> = Symbol('CheckboxGroupProvide');
