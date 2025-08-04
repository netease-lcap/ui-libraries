import { DatePicker as VantDatePicker } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
import * as basicPlugin from './plugins';
import './index.css';

function VanDatePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanDatePicker = registerComponent(VantDatePicker, { plugin: basicPlugin, name: 'van-date-picker' });
const VanFormDatePicker = withFormItem(VanDatePicker, 'van-form-date-picker');
export { VanDatePickerRegister, VanDatePicker, VanFormDatePicker, VantDatePicker };
export default VanDatePicker;
