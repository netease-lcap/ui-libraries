import Tooltip from 'element-ui/lib/tooltip';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElTooltip = registerComponent(Tooltip, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'content'],
  methodNames: [],
});

export default ElTooltip;
