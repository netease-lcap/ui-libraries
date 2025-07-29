import { DatePicker as VantDatePicker } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.css';

function VanDatePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanDatePicker = registerComponent(VantDatePicker, { plugin: basicPlugin });
export { VanDatePickerRegister, VanDatePicker, VantDatePicker };
export default VanDatePicker;
