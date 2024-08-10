import Progress from 'element-ui/lib/progress';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElProgress = registerComponent(Progress, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElProgress;
