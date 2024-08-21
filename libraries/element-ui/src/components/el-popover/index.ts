import Popover from 'element-ui/lib/popover';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElPopover = registerComponent(Popover, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'reference'],
  methodNames: [],
});

export default ElPopover;
