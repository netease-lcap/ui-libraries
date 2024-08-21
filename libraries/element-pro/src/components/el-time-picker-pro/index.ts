import { TimePicker, TimeRangePicker } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTimePickerPro = registerComponent(TimePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElTimeRangePickerPro = TimeRangePicker;

export default ElTimePickerPro;
