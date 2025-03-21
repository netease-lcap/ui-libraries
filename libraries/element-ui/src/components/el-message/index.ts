import { registerComponent } from '@lcap/vue2-utils/plugins/index';

import Message from './message';
import MessageDesigner from './designer.vue';

export const ElMessageDesigner = MessageDesigner;
export const ElMessage = registerComponent(Message, {}, {
  name: 'ElMessage',
  slotNames: ['default'],
  nativeEvents: [],
  methodNames: ['open', 'close'],
  eventNames: [],
});

export default ElMessage;
