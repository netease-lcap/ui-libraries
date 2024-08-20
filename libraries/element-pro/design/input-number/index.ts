import VueCompositionAPI from '@vue/composition-api';
import _InputNumber from './input-number';
import withInstall from '../utils/withInstall';
import { ElInputNumberProps } from './type';

import './style';

export type InputNumberProps = ElInputNumberProps;
export * from './type';

export const InputNumber = withInstall(_InputNumber, VueCompositionAPI);
export default InputNumber;
