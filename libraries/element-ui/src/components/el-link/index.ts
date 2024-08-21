import Link from 'element-ui/lib/link';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElLink = registerComponent(Link, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElLink;
