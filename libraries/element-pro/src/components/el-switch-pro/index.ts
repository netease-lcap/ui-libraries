import { Switch } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElSwitchPro = registerComponent(Switch, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSwitchPro;
