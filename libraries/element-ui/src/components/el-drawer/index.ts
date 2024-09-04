import Drawer from 'element-ui/lib/drawer';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElDrawer = registerComponent(Drawer, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'title'],
  methodNames: [],
});

export default ElDrawer;
