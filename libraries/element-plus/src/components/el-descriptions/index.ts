import { ElDescriptions as ElDescriptionsPlus, ElDescriptionsItem } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import './index.css';

import { ElDescriptionsCell } from './cell';

function ElDescriptionsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDescriptions = registerComponent(ElDescriptionsPlus, { plugin: basicPlugin });
ElDescriptions.BaseComponent = ElDescriptionsPlus;

export { ElDescriptionsPlus, ElDescriptions, ElDescriptionsItem, ElDescriptionsCell, ElDescriptionsRegister };
export default ElDescriptions;
