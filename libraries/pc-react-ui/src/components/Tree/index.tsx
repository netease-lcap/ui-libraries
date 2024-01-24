import { Tree as AntdTree } from 'antd';
import type { TreeProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  dataSource: 'treeData',
};

const Tree = registerComponet<
  TreeProps,
  pluginType<TreeProps>
>(
  AntdTree,
  { plugin, displayName: 'Tree', mapProps },
);

export default Tree;
