import { TreeSelect } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTreeSelectPro = registerComponent(TreeSelect, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTreeSelectPro;
