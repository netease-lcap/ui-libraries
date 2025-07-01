import {
  ElMenu as ElMenuPlus,
  ElMenuItem as ElMenuItemPlus,
  ElMenuItemGroup as ElMenuItemGroupPlus,
  ElSubMenu as ElSubMenuPlus,
} from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import * as itemPlugin from './plugins/item-plugin';
import * as menuItemPlugin from './plugins/menu-item';

import './index.css';

function ElMenuRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}
function ElMenuItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(menuItemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}
function ElMenuItemGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}
function ElSubMenuRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMenu = registerComponent(ElMenuPlus, { plugin: basicPlugin });
const ElMenuItem = registerComponent(ElMenuItemPlus, { plugin: menuItemPlugin });
const ElMenuItemGroup = registerComponent(ElMenuItemGroupPlus, { plugin: itemPlugin });
const ElSubMenu = registerComponent(ElSubMenuPlus, { plugin: itemPlugin });

export {
  ElMenu,
  ElMenuPlus,
  ElMenuItem,
  ElMenuItemPlus,
  ElMenuItemGroup,
  ElMenuItemGroupPlus,
  ElSubMenu,
  ElSubMenuPlus,
  ElMenuRegister,
  ElMenuItemRegister,
  ElMenuItemGroupRegister,
  ElSubMenuRegister,
};
export default ElMenu;
