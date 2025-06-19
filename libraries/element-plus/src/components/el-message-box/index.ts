import _ from 'lodash';
import { registerComponent } from '@/plugins';
import MessageBoxDesigner from './designer.vue';
import MessageBox from './message-box';

function ElMessageBoxRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMessageBox = MessageBox;
const ElMessageBoxDesigner = MessageBoxDesigner;


export { ElMessageBoxRegister, ElMessageBox, ElMessageBoxDesigner };
export default ElMessageBox;
