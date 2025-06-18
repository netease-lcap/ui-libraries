import { ElTimePicker as ElTimePickerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';
import './index.css';

function ElTimePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimePicker = registerComponent(ElTimePickerPlus, {
  plugin: basicPlugin,
});

const ElFormTimePicker = withFormItem(ElTimePicker, 'el-time-picker');


export default ElTimePicker;

export { ElTimePickerPlus, ElTimePicker, ElFormTimePicker, ElTimePickerRegister };
