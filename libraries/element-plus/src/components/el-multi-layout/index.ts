import _ from 'lodash';
import { registerComponent } from '@/plugins';
import ElMultiLayoutPlus from './multi-layout';
import ElMultiLayoutItemPlus from './multi-layout-item';

import basicsPlugin from './plugins/basic-plugins';
import itemPlugins from './plugins/item-plugins';

function ElMultiLayoutRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMultiLayout = registerComponent(ElMultiLayoutPlus, { plugin: basicsPlugin, name: 'el-multi-layout' });
const ElMultiLayoutItem = registerComponent(ElMultiLayoutItemPlus, {
  plugin: itemPlugins,
  name: 'el-multi-layout-item',
});

export { ElMultiLayoutRegister, ElMultiLayout, ElMultiLayoutItem };
export default ElMultiLayout;
