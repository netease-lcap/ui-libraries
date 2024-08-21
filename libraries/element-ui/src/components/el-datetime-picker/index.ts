import DatetimePicker from 'element-ui/lib/date-picker';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElDatetimePicker = registerComponent({
  ...DatetimePicker,
  name: 'ElDatetimePicker',
}, plugins, {
  nativeEvents: [],
  slotNames: ['range-separator'],
  methodNames: ['focus'],
});

export default ElDatetimePicker;
