import { Rate } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElRatePro = registerComponent(Rate, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElRatePro;
