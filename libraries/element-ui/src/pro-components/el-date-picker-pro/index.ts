import {
  DatePicker,
  DateRangePicker,
  DatePickerPanel,
  DateRangePickerPanel,
} from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElDatePickerPro = registerComponent(DatePicker, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
  rangeModel: ['startValue', 'endValue'],
});
export const ElDateRangePickerPro = DateRangePicker;
export const ElDatePickerPanelPro = DatePickerPanel;
export const ElDateRangePickerPanelPro = DateRangePickerPanel;

export const ElFormDatePickerPro = WithFormItem(ElDatePickerPro, { name: FORM_TAG_NAME, methodNames: [] });

export default ElDatePickerPro;
