import { Tabbar as VantTabbar, TabbarItem as VantTabbarItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanTabbarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTabbar = registerComponent(VantTabbar, { name: 'van-tabbar' });
const VanTabbarItem = registerComponent(VantTabbarItem, { name: 'van-tabbar-item' });
export { VanTabbarRegister, VanTabbar, VantTabbar, VanTabbarItem, VantTabbarItem };
export default VanTabbar;
