import Switch from 'element-ui/lib/switch';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElSwitch = registerComponent(Switch, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: ['focus'],
});

export default ElSwitch;
