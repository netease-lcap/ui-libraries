import { DropdownMenu as VantDropdownMenu, DropdownItem as VantDropdownItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import * as basicPluginItem from './plugins/item';
// import * as basicPluginItemSon from './plugins/item-son';

function VanDropdownMenuRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function VanDropdownItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

// function VanDropdownItemSonRegister(BaseComponent, plugin = {}, extend = true) {
//   const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
//   return registerComponent(BaseComponent, { plugin: componentPlugin });
// }

const VanDropdownMenu = registerComponent(VantDropdownMenu, {
  plugin: basicPlugin,
  name: 'van-dropdown-menu',
});

const VanDropdownItem = registerComponent(VantDropdownItem, {
  plugin: basicPluginItem,
  name: 'van-dropdown-item',
});

// const VanDropdownItemSon = registerComponent(VantDropdownItemSon, {
//   plugin: basicPluginItemSon,
//   name: 'van-dropdown-item-son',
// });

export {
  VanDropdownMenu,
  VanDropdownMenuRegister,
  VantDropdownMenu,
  VanDropdownItem,
  VanDropdownItemRegister,
  VantDropdownItem,
  // VanDropdownItemSon,
  // VanDropdownItemSonRegister,
  // VantDropdownItemSon,
};
export default VanDropdownMenu;
