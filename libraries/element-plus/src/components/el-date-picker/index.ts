import { ElDatePicker as ElDatePickerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';
import './index.css';

function ElDatePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDatePicker = registerComponent(ElDatePickerPlus, { plugin: basicsPlugin, name: 'el-date-picker' });
const ElFormDatePicker = withFormItem(ElDatePicker, 'el-form-date-picker');

export { ElDatePickerPlus, ElDatePicker, ElFormDatePicker, ElDatePickerRegister };
export default ElDatePicker;
