import { InputNumber } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElInputNumberPro = registerComponent(InputNumber, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElInputNumberPro;
