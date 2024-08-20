import { InputNumber } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElInputNumberPro = registerComponent(InputNumber, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElInputNumberPro;
