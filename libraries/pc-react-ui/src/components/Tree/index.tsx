import { Tree as AntdTree } from 'antd';
import type { TreeProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // dataSource: 'treeData',
};

export const Tree = registerComponet<
  TreeProps,
  TreeProps
>(
  AntdTree,
  { plugin, displayName: 'Tree', mapProps },
);

// Tree.defo
// export const Tree = AntdTree;
export const { TreeNode } = AntdTree;
