import { Rate } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElRatePro = registerComponent(Rate, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElRatePro;
