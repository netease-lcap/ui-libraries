import { ElDescriptions as ElDescriptionsPlus, ElDescriptionsItem as ElDescriptionsItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import * as itemPlugins from './plugins/item-plugins';
import './index.css';

import { ElDescriptionsCell } from './cell';

function ElDescriptionsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDescriptions = registerComponent(ElDescriptionsPlus, { plugin: basicPlugin, name: 'el-descriptions' });
const ElDescriptionsItem = registerComponent(ElDescriptionsItemPlus, {
  plugin: itemPlugins,
  name: 'ElDescriptionsItem',
});

export { ElDescriptionsPlus, ElDescriptions, ElDescriptionsItem, ElDescriptionsRegister };
export default ElDescriptions;
