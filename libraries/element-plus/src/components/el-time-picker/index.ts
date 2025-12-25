import { ElTimePicker as ElTimePickerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';
import './index.css';

function ElTimePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimePicker = registerComponent(ElTimePickerPlus, {
  plugin: basicPlugin,
  name: 'el-time-picker',
});

const ElFormTimePicker = withFormItem(ElTimePicker, 'el-form-time-picker');

export { ElTimePickerPlus, ElTimePicker, ElTimePickerRegister, ElFormTimePicker };
export const ElTimePickerBasicsPlugin = basicPlugin;
export default ElTimePicker;
