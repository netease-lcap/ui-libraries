import Tree from 'element-ui/lib/tree';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElTree = registerComponent(Tree, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTree;
