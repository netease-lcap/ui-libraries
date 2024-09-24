import VueCompositionAPI from '@vue/composition-api';

import _TagInput from './tag-input';
import withInstall from '../utils/withInstall';
import { ElTagInputProps } from './type';

import './style';

export * from './type';
export * from './interface';
export type TagInputProps = ElTagInputProps;

export const TagInput = withInstall(_TagInput, VueCompositionAPI);

export default TagInput;
