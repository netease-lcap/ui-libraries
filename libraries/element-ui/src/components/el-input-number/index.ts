import InputNumber from 'element-ui/lib/input-number';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElInputNumber = registerComponent(InputNumber, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: ['focus', 'select'],
});

export default ElInputNumber;
