import Divider from 'element-ui/lib/divider';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElDivider = registerComponent(Divider, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElDivider;
