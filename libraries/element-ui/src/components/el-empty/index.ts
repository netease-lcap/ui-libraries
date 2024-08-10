import Empty from 'element-ui/lib/empty';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElEmpty = registerComponent(Empty, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'image', 'description'],
  methodNames: [],
});

export default ElEmpty;
