import { Switch } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElSwitchPro = registerComponent(Switch, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSwitchPro;
