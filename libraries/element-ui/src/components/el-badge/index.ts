import Badge from 'element-ui/lib/badge';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElBadge = registerComponent(Badge, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElBadge;
