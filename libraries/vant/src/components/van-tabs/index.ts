import { Tabs as VantTabs, Tab as VantTab } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as itemPlugins from './plugins/item';

function VanTabsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTabs = VantTabs;
const VanTab = registerComponent(VantTab, { plugin: itemPlugins });
export { VanTabsRegister, VanTabs, VantTabs, VanTab, VantTab };
export default VanTabs;
