import _ from 'lodash';
import Notification from './notification';
import NotificationDesigner from './designer.vue';
import { registerComponent } from '@/plugins';

function ElNotificationRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElNotificationDesigner = NotificationDesigner;
const ElNotification = Notification;

ElNotificationDesigner.BaseComponent = NotificationDesigner;
ElNotification.BaseComponent = Notification;

export { ElNotificationRegister, ElNotificationDesigner, ElNotification };
export default Notification;
