import { Switch as VanSwitchOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanSwitch = registerComponent(VanSwitchOrigin, {
  plugin: plugins,
  name: 'van-switch',
});

export default VanSwitch;
