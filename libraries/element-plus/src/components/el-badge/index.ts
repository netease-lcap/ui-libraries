import { ElBadge as ElBadgePlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElBadgeRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElBadge = registerComponent(ElBadgePlus, { plugin: basicsPlugin, name: 'el-badge' });

export { ElBadgePlus, ElBadge, ElBadgeRegister };
export const ElBadgeBasicsPlugin = basicsPlugin;
export default ElBadge;
