import { TimePicker, TimeRangePicker } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';
import * as plugins from './plugins';

export const ElTimePickerPro = registerComponent(TimePicker, plugins, {
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

export const ElTimeRangePickerPro = TimeRangePicker;
export const ElFormTimePickerPro = WithFormItem(ElTimePickerPro, { name: FORM_TAG_NAME });

export default ElTimePickerPro;
