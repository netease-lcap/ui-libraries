import { ElDivider as ElDividerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElDividerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDivider = registerComponent(ElDividerPlus, { plugin: basicsPlugin, name: 'el-divider' });

export { ElDividerPlus, ElDivider, ElDividerRegister };
export const ElDividerBasicsPlugin = basicsPlugin;
export default ElDivider;
