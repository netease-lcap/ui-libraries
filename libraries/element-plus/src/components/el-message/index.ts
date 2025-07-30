import _ from 'lodash';
import Message from './message';
import MessageDesigner from './designer.vue';
import { registerComponent } from '@/plugins';

function ElMessageRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMessageDesigner = MessageDesigner;
const ElMessage = Message;

export { ElMessageDesigner, ElMessageRegister, ElMessage, Message };
export default Message;
