import { Rate } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElRatePro = registerComponent(Rate, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElFormRatePro = WithFormItem(ElRatePro, { name: FORM_TAG_NAME, methodNames: [] });

export default ElRatePro;
