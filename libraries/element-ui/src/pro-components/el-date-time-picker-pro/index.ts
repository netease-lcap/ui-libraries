import { DatePicker } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElDateTimePickerPro = registerComponent(DatePicker, plugins, {
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

export const ElFormDateTimePickerPro = WithFormItem(ElDateTimePickerPro, { name: FORM_TAG_NAME, methodNames: [] });
export default ElDateTimePickerPro;
