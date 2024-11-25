import { Input, InputGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';
import './index.less';

export const ElInputPro = registerComponent(Input, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [
    // 'label',
    // 'prefixIcon',
    // 'suffix',
    // 'suffixIcon',
    // 'tips',
  ],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElInputGroupPro = InputGroup;

export const ElFormInputPro = WithFormItem(ElInputPro, { name: FORM_TAG_NAME });

export default ElInputPro;
