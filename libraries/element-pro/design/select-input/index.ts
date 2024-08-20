import VueCompositionAPI from '@vue/composition-api';

import _SelectInput from './select-input';
import withInstall from '../utils/withInstall';
import { ElSelectInputProps } from './type';

import './style';

export * from './type';
export type SelectInputProps = ElSelectInputProps;

export const SelectInput = withInstall(_SelectInput, VueCompositionAPI);

export default SelectInput;
