import { Switch as VanSwitchOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
import * as plugins from './plugins';

export const VanSwitch = registerComponent(VanSwitchOrigin, {
  plugin: plugins,
  name: 'van-switch',
});
const VanFormSwitch = withFormItem(VanSwitch, 'van-form-switch');

export { VanFormSwitch };
export default VanSwitch;
