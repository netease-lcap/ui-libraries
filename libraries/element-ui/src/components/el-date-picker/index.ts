import DatePicker from 'element-ui/lib/date-picker';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElDatePicker = registerComponent(DatePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: ['focus'],
});

export default ElDatePicker;
