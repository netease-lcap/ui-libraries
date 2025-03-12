import { ElMenu as ElMenuPlus, ElMenuItem, ElMenuItemGroup, ElSubMenu } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-menu-item.css';
import 'element-plus/theme-chalk/el-menu-item-group.css';
import 'element-plus/theme-chalk/el-sub-menu.css';

const ElMenu = registerComponent(ElMenuPlus, { plugin: basicPlugin });
// const ElMenuItemPlus = ElMenuItem;

export { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu };
export default ElMenu;
