import { List as AntdList } from 'antd';
import type { ListProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

type ListItemProps = typeof AntdList.Item

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const List = registerComponet<
  ListProps<ListItemProps>,
  pluginType<ListProps<ListItemProps>>
>(
  AntdList,
  { plugin, displayName: 'List', mapProps },
);

export default List;
export const ListItem = AntdList.Item;
