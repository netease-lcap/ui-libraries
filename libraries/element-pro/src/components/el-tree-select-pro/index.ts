import { TreeSelect } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import './index.less';

export const ElTreeSelectPro = registerComponent(TreeSelect, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export default ElTreeSelectPro;
