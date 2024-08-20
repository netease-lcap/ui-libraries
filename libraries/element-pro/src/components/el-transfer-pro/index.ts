import { Transfer } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTransferPro = registerComponent(Transfer, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTransferPro;
