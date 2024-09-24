import _CheckboxGroup from './group';
import _Checkbox from './checkbox';
import withInstall from '../utils/withInstall';
import { ElCheckboxProps, ElCheckboxGroupProps } from './type';

import './style';

export type CheckboxProps = ElCheckboxProps;
export type CheckboxGroupProps = ElCheckboxGroupProps;
export * from './type';

export const Checkbox = withInstall(_Checkbox);

export const CheckboxGroup = withInstall(_CheckboxGroup);

export default Checkbox;
