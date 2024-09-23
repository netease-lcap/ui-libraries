import _Input from './input';
import _InputGroup from './input-group';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { InputValue, ElInputProps } from './type';

import './style';

export * from './type';
export type InputProps<T = InputValue> = ElInputProps<T>;
export type InputBlurEventParams = Parameters<InputProps['onBlur']>;
export type InputFocusEventParams = Parameters<InputProps['onFocus']>;
export type StrInputProps = ElInputProps<string>;
export type NumberInputProps = ElInputProps<number>;

export const Input = withInstall(
  mapProps(['value'], {
    model: { prop: 'value', event: 'change' },
  })(_Input),
);
export const InputGroup = withInstall(_InputGroup);

export default Input;
