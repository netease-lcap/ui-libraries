import Rate from 'element-ui/lib/rate';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElRate = registerComponent(Rate, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElRate;
