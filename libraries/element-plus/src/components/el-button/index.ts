import { ElButton as ElButtonPlus, ElButtonGroup } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';

import './index.css';

function ElButtonRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElButton = registerComponent(ElButtonPlus, { plugin: basicsPlugin, name: 'el-button' });
export { ElButtonPlus, ElButton, ElButtonRegister, ElButtonGroup };

export default ElButton;
