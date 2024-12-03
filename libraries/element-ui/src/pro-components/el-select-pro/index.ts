import { Select, Option, OptionGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElSelectPro = registerComponent(Select, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});
export const ElOptionPro = Option;
export const ElOptionGroupPro = OptionGroup;

export const ElFormSelectPro = WithFormItem(ElSelectPro, { name: FORM_TAG_NAME, methodNames: [] });
export default ElSelectPro;
