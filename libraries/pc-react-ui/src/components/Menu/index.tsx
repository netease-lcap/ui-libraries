import { Menu as AntdMenu } from 'antd';
import type { MenuProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Menu = registerComponet<
  MenuProps,
  pluginType<MenuProps>
>(
  AntdMenu,
  { plugin, displayName: AntdMenu.displayName, mapProps },
);

export default Menu;
export const MenuItem = AntdMenu.Item;
export const MenuItemGroup = AntdMenu.ItemGroup;
export const MenuSubMenu = AntdMenu.SubMenu;
export const MenuDivider = AntdMenu.Divider;
