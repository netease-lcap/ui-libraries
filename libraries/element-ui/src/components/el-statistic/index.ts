import Statistic from 'element-ui/lib/statistic';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElStatistic = registerComponent(Statistic, plugins, {
  nativeEvents: [],
  slotNames: ['prefix', 'suffix', 'title'],
  methodNames: ['suspend'],
});

export default ElStatistic;
