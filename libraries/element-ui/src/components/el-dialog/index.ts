import Dialog from 'element-ui/lib/dialog';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElDialog = registerComponent(Dialog, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'title', 'footer'],
  methodNames: [],
});

export default ElDialog;
