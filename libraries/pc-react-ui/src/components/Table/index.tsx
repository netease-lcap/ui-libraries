import { ProTable as AntdTable } from '@ant-design/pro-components';
import type { ProTableProps } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Table = registerComponet<
  ProTableProps,
  pluginType<ProTableProps>
>(
  AntdTable,
  { plugin, displayName: 'descriptions', mapProps },
);

export default Table;

// export const DescriptionsItem = AntdTable.Item;
