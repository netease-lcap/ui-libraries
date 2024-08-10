import Switch from 'element-ui/lib/switch';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElSwitch = registerComponent(Switch, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: ['focus'],
});

export default ElSwitch;
