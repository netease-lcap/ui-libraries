import VueCompositionAPI from '@vue/composition-api';
import { ElTreeSelectProps, TreeSelectValue } from './type';
import { TreeOptionData } from '../common';
import _TreeSelect from './tree-select';
import withInstall from '../utils/withInstall';

import './style';

export * from './interface';

export type TreeSelectProps<
  DataOption extends TreeOptionData = TreeOptionData,
  ValueType extends TreeSelectValue = TreeSelectValue,
> = ElTreeSelectProps<DataOption, ValueType>;

export const TreeSelect = withInstall(_TreeSelect, VueCompositionAPI);
export default TreeSelect;
