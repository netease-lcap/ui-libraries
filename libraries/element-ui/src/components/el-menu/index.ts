import './index.css';
import Menu from 'element-ui/lib/menu';
import Submenu from 'element-ui/lib/submenu';
import MenuItem from 'element-ui/lib/menu-item';
import MenuItemGroup from 'element-ui/lib/menu-item-group';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElMenu = registerComponent(Menu, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['open', 'close'],
});
export const ElSubmenu = Submenu;
export const ElMenuItem = MenuItem;
export const ElMenuItemGroup = MenuItemGroup;

export default ElMenu;
