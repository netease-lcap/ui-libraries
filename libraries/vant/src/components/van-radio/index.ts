import { Radio as VanRadioOrigin, RadioGroup as VanRadioGroupOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

export const VanRadio = VanRadioOrigin;
// registerComponent(VanRadioOrigin, {
//   plugin: radioPlugins,
//   name: 'van-radio',
// });

export const VanRadioGroup = registerComponent(VanRadioGroupOrigin, {
  plugin: plugins,
  name: 'van-radio-group',
});
export const VanFormRadioGroup = withFormItem(VanRadioGroup, 'van-form-radio-group');

export default VanRadio;
