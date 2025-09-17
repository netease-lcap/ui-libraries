import { ElLink as ElLinkPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/index';

function ElLinkRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElLink = registerComponent(ElLinkPlus, { plugin: basicsPlugin, name: 'el-link' });

export { ElLinkPlus, ElLink, ElLinkRegister };
export default ElLink;
