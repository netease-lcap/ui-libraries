import { Tree } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTreePro = registerComponent(Tree, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTreePro;
