import { ElCard as ElCardPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElCardRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCard = registerComponent(ElCardPlus, { plugin: basicsPlugin, name: 'el-card' });
export { ElCardPlus, ElCard, ElCardRegister };
export default ElCard;
