import _RangeInput from './range-input';
import _RangeInputPopup from './range-input-popup';
import withInstall from '../utils/withInstall';
import { ElRangeInputProps, ElRangeInputPopupProps } from './type';

import './style';

export * from './type';

export type RangeInputProps = ElRangeInputProps;
export type RangeInputPopupProps = ElRangeInputPopupProps;

export const RangeInput = withInstall(_RangeInput);
export const RangeInputPopup = withInstall(_RangeInputPopup);

export default RangeInput;
