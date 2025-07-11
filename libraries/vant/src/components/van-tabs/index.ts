import { Tabs as VantTabs, Tab as VantTab } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanTabsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTabs = registerComponent(VantTabs, { name: 'van-tabs' });
const VanTab = registerComponent(VantTab, { name: 'van-tab' });
export { VanTabsRegister, VanTabs, VantTabs, VanTab, VantTab };
export default VanTabs;
