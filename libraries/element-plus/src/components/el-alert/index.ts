import { ElAlert as ElAlertPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElAlertRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElAlert = registerComponent(ElAlertPlus, { plugin: basicsPlugin, name: 'el-alert' });
export { ElAlertPlus, ElAlert, ElAlertRegister };
export const ElAlertBasicsPlugin = basicsPlugin;
export default ElAlert;
