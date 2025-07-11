import { TimePicker as VantTimePicker } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanTimePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTimePicker = VantTimePicker;
export { VanTimePickerRegister, VanTimePicker, VantTimePicker };
export default VanTimePicker;
