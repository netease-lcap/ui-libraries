import { ElTooltip as ElTooltipPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElTooltipRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTooltip = registerComponent(ElTooltipPlus, { plugin: basicsPlugin, name: 'el-tooltip' });
export { ElTooltipPlus, ElTooltip, ElTooltipRegister };
export const ElTooltipBasicsPlugin = basicsPlugin;
export default ElTooltip;
