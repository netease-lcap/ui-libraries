import { Radio, RadioGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import * as radioPlugins from './plugins/radio-plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';
import './index.less';

export const ElRadioGroupPro = registerComponent(RadioGroup, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  eventNames: ['change'],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElRadioPro = registerComponent(Radio, radioPlugins, {});

export const ElFormRadioGroupPro = WithFormItem(ElRadioGroupPro, { name: FORM_TAG_NAME, methodNames: ['reload'] });

export default ElRadioGroupPro;
