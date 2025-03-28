import { ElMenu as ElMenuPlus, ElMenuItem as ElMenuItemPlus, ElMenuItemGroup as ElMenuItemGroupPlus, ElSubMenu as ElSubMenuPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import * as itemPlugin from './plugins/item-plugin';
import * as menuItemPlugin from './plugins/menu-item';

import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-menu-item.css';
import 'element-plus/theme-chalk/el-menu-item-group.css';
import 'element-plus/theme-chalk/el-sub-menu.css';
import './index.css';

const ElMenu = registerComponent(ElMenuPlus, { plugin: basicPlugin });
const ElMenuItem = registerComponent(ElMenuItemPlus, { plugin: menuItemPlugin });
const ElMenuItemGroup = registerComponent(ElMenuItemGroupPlus, { plugin: itemPlugin });
const ElSubMenu = registerComponent(ElSubMenuPlus, { plugin: itemPlugin });

export { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu };
export default ElMenu;
