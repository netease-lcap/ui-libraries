import Progress from 'element-ui/lib/progress';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElProgress = registerComponent(Progress, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElProgress;
