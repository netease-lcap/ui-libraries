import { TreeSelect } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTreeSelectPro = registerComponent(TreeSelect, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTreeSelectPro;
