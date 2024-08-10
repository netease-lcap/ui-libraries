import Transfer from 'element-ui/lib/transfer';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElTransfer = registerComponent(Transfer, plugins, {
  nativeEvents: [],
  slotNames: ['left-footer', 'right-footer'],
  methodNames: ['clearQuery'],
});

export default ElTransfer;
