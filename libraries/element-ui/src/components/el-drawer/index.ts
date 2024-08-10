import Drawer from 'element-ui/lib/drawer';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElDrawer = registerComponent(Drawer, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'title'],
  methodNames: ['closeDrawer'],
});

export default ElDrawer;
