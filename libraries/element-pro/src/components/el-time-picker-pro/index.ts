import { TimePicker, TimeRangePicker } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTimePickerPro = registerComponent(TimePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
  rangeModel: ['startValue', 'endValue'],
});
export const ElTimeRangePickerPro = TimeRangePicker;

export default ElTimePickerPro;
