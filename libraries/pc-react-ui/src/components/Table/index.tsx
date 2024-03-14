// import { ProTable as AntdTable } from '@ant-design/pro-components';
import './theme/vars.css';
import React from 'react';
import { Table as AntdTable } from 'antd';
import type { TableProps } from 'antd';
// import type { ProTableProps as TableProps } from '@ant-design/pro-components';
import { registerComponet, Plugin } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

// const myPlugin = new Plugin({ plugin, displayName: 'Table', mapProps });
export const Table = registerComponet<
  TableProps,
  pluginType<TableProps>
>(
  AntdTable,
  { plugin, displayName: 'Table', mapProps },
);

// Table.defaultProps = {
//   search: false,
//   options: false,
// };
// export default Table;
// AntdTable.Column.displayName = 'TableColumn';
export const TableColumn = AntdTable.Column;
// export const DescriptionsItem = AntdTable.Item;
