import { Tree } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTreePro = registerComponent(Tree, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTreePro;
