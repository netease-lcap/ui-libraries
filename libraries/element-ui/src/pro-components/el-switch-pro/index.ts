import { Switch } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';
import * as plugins from './plugins';

export const ElSwitchPro = registerComponent(Switch, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElFormSwitchPro = WithFormItem(ElSwitchPro, { name: FORM_TAG_NAME, methodNames: [] });
export default ElSwitchPro;
