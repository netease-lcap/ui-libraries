import { Menu as AntdMenu } from 'antd';
import type { MenuProps, MenuItemProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as menuItemPlugin from './plugins/menuItemPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Menu = registerComponet<
  MenuProps,
  pluginType<MenuProps>
>(
  AntdMenu,
  { plugin, displayName: AntdMenu.displayName, mapProps },
);

export const MenuItem = registerComponet<
  MenuProps,
  pluginType<MenuItemProps>
>(
  AntdMenu.Item,
  { plugin: menuItemPlugin, displayName: AntdMenu.displayName, mapProps },
);
// export default Menu;
// export const MenuItem = AntdMenu.Item;
export const MenuItemGroup = AntdMenu.ItemGroup;
export const MenuSubMenu = AntdMenu.SubMenu;
export const MenuDivider = AntdMenu.Divider;
