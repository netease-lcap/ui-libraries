import { ElTabs as ElTabsPlus, ElTabPane } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElTabsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTabs = registerComponent(ElTabsPlus, { plugin: basicsPlugin });
export { ElTabsPlus, ElTabs, ElTabPane, ElTabsRegister };
export const ElTabsBasicsPlugin = basicsPlugin;
export default ElTabs;
