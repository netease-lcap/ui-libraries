import { registerComponent } from '@lcap/vue2-utils/plugins/index';

import Notification from './notification';
import NotificationDesigner from './designer.vue';

export const ElNotificationDesigner = NotificationDesigner;
export const ElNotification = registerComponent(Notification, {}, {
  name: 'ElNotification',
  slotNames: ['default'],
  nativeEvents: [],
  methodNames: ['open', 'close'],
  eventNames: [],
});

export default ElNotification;
