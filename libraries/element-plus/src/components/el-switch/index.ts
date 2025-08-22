import { ElSwitch as ElSwitchPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

function ElSwitchRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElSwitch = registerComponent(ElSwitchPlus, { plugin: basicsPlugin, name: 'el-switch' });
const ElFormSwitch = withFormItem(ElSwitch, 'el-form-switch');

export { ElSwitchPlus, ElSwitch, ElFormSwitch, ElSwitchRegister };
export default ElSwitch;
