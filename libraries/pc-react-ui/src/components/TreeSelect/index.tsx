import { TreeSelect as AntdTreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // dataSource: 'treeData',
};

export const TreeSelect = registerComponet<
  TreeSelectProps,
  pluginType<TreeSelectProps>
>(
  AntdTreeSelect,
  { plugin, displayName: AntdTreeSelect.displayName, mapProps },
);

// export default TreeSelect;
