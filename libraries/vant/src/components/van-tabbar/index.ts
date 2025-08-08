import { Tabbar as VantTabbar, TabbarItem as VantTabbarItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugins from './plugins';
import * as itemPlugins from './plugins/item';

function VanTabbarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTabbar = registerComponent(VantTabbar, { plugin: basicPlugins });
const VanTabbarItem = registerComponent(VantTabbarItem, { plugin: itemPlugins });
export { VanTabbarRegister, VanTabbar, VantTabbar, VanTabbarItem, VantTabbarItem };
export default VanTabbar;
