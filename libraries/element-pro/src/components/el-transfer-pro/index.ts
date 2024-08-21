import { Transfer } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTransferPro = registerComponent(Transfer, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTransferPro;
