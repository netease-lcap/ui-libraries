import { Cascader } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElCascaderPro = registerComponent(Cascader, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElFormCascaderPro = WithFormItem(ElCascaderPro, { name: FORM_TAG_NAME, methodNames: ['reload'] });

export default ElCascaderPro;
