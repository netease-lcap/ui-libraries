import { Radio as VanRadioOrigin, RadioGroup as VanRadioGroupOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanRadio = VanRadioOrigin;
//  registerComponent(VanRadioOrigin, {
//   plugin: plugins,
//   name: 'van-radio',
// });

export const VanRadioGroup = registerComponent(VanRadioGroupOrigin, {
  plugin: plugins,
  name: 'van-radio-group',
});

export default VanRadio;
