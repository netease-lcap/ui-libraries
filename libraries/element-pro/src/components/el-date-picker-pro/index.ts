import {
  DatePicker,
  DateRangePicker,
  DatePickerPanel,
  DateRangePickerPanel,
} from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElDatePickerPro = registerComponent(DatePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});
export const ElDateRangePickerPro = DateRangePicker;
export const ElDatePickerPanelPro = DatePickerPanel;
export const ElDateRangePickerPanelPro = DateRangePickerPanel;

export default ElDatePickerPro;
