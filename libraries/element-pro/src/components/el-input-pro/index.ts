import { Input, InputGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import './index.less';

export const ElInputPro = registerComponent(Input, plugins, {
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

export default ElInputPro;
