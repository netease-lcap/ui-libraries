import { ElScrollbar as ElScrollbarPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

function ElScrollbarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElScrollbar = registerComponent(ElScrollbarPlus, { plugin: basicPlugin, name: 'el-scrollbar' });

export default ElScrollbar;

export { ElScrollbarPlus, ElScrollbar, ElScrollbarRegister };
