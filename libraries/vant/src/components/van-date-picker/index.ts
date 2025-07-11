import { DatePicker as VantDatePicker } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanDatePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanDatePicker = VantDatePicker;
export { VanDatePickerRegister, VanDatePicker, VantDatePicker };
export default VanDatePicker;
