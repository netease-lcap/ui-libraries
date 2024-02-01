// import { ProTable as AntdTable } from '@ant-design/pro-components';
import { Table as AntdTable } from 'antd';
import type { TableProps } from 'antd';
// import type { ProTableProps as TableProps } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Table = registerComponet<
  TableProps,
  pluginType<TableProps>
>(
  AntdTable,
  { plugin, displayName: 'descriptions', mapProps },
);

export default Table;

export const TableColumn = AntdTable.Column;
// export const DescriptionsItem = AntdTable.Item;
