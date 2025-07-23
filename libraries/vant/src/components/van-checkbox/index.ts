import { Checkbox as VanCheckboxOrigin, CheckboxGroup as VanCheckboxGroupOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanCheckbox = VanCheckboxOrigin;
// registerComponent(VanCheckboxOrigin, {
//   plugin: plugins,
//   name: 'van-checkbox',
// });

export const VanCheckboxGroup = registerComponent(VanCheckboxGroupOrigin, {
  plugin: plugins,
  name: 'van-checkbox-group',
});

export default VanCheckbox;
