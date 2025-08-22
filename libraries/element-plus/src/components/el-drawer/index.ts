import { ElDrawer as ElDrawerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElDrawerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDrawer = registerComponent(ElDrawerPlus, { plugin: basicsPlugin, name: 'el-drawer' });

export { ElDrawerPlus, ElDrawer, ElDrawerRegister };
export default ElDrawer;
