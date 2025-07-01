import { ElTimeSelect as ElTimeSelectPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';

function ElTimeSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimeSelect = registerComponent(ElTimeSelectPlus, { plugin: basicPlugin, name: 'el-time-select' });
const ElFormTimeSelect = withFormItem(ElTimeSelect, 'el-form-time-select');

export default ElTimeSelect;

export { ElTimeSelectPlus, ElTimeSelect, ElFormTimeSelect, ElTimeSelectRegister };
