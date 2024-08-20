import {
  DatePicker,
  DateRangePicker,
  DatePickerPanel,
  DateRangePickerPanel,
} from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElDatePickerPro = registerComponent(DatePicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElDateRangePickerPro = DateRangePicker;
export const ElDatePickerPanelPro = DatePickerPanel;
export const ElDateRangePickerPanelPro = DateRangePickerPanel;

export default ElDatePickerPro;
