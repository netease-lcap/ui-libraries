import { registerComponent } from '@lcap/vue2-utils/plugins/index';

import MessageBoxDesigner from './designer.vue';
import MessageBox from './message-box';

export const ElMessageBox = registerComponent(MessageBox, {}, {
  name: 'ElMessageBox',
  slotNames: ['default'],
  nativeEvents: [],
  methodNames: ['open', 'close'],
  eventNames: [],
});
export const ElMessageBoxDesigner = MessageBoxDesigner;

export default ElMessageBox;
