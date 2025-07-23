import { TimePicker as VantTimePicker, PickerGroup as VantPickerGroup } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.css';

function VanTimePickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTimePicker = registerComponent(VantTimePicker, { plugin: basicPlugin, name: 'van-time-picker' });
const VanPickerGroup = registerComponent(VantPickerGroup, { });
export { VanTimePickerRegister, VanTimePicker, VantTimePicker, VanPickerGroup };
export default VanTimePicker;
