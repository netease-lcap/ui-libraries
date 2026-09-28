import { Picker as VantPicker } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import './index.css';
import { withFormItem } from '@/components/van-form/plugins/form-item';

function VanPickerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanPicker = registerComponent(VantPicker, {
  plugin: basicPlugin,
  name: 'van-picker',
});
const VanFormPicker = withFormItem(VanPicker, 'van-form-picker');

export { VanPicker, VanPickerRegister, VantPicker, VanFormPicker };
export default VanPicker;
