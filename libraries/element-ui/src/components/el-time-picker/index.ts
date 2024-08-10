import TimePicker from 'element-ui/lib/time-picker';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElTimePicker = registerComponent(TimePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: ['focus'],
});

export default ElTimePicker;
