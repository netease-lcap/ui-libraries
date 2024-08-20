import { ElCascaderProps, CascaderValue, CascaderChangeSource } from './type';
import { ElSelectInputProps } from '../select-input/type';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import { TreeNodeModel, TreeNodeValue } from '../_common/js/tree/types';

export * from './type';
export interface CascaderContextType
  extends Pick<
    ElCascaderProps,
    | 'size'
    | 'disabled'
    | 'checkStrictly'
    | 'lazy'
    | 'multiple'
    | 'filterable'
    | 'filter'
    | 'clearable'
    | 'checkProps'
    | 'showAllLevels'
    | 'max'
    | 'value'
    | 'minCollapsedNum'
    | 'valueType'
  > {
  treeStore: TreeStore;
  setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => void;
  visible: boolean;
  setVisible: ElSelectInputProps['onPopupVisibleChange'];
  treeNodes: TreeNode[];
  setTreeNodes: (val: CascaderValue) => void;
  inputVal: ElSelectInputProps['inputValue'];
  setInputVal: (val: ElSelectInputProps['inputValue']) => void;
  setExpend: (val: TreeNodeValue[]) => void;
  cascaderValue: CascaderValue;
}

export { TreeNode } from '../_common/js/tree/tree-node';
export type { TreeNodeValue } from '../_common/js/tree/types';
export type { TreeOptionData } from '../_common/js/common';
export type { TreeNodeModel } from '../tree';
export type { ElSelectInputProps } from '../select-input/type';
export type { TreeKeysType } from '../common';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];
