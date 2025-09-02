import { ElTooltip as ElTooltipPlus, ElTooltipTrigger as ElTooltipTriggerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElTooltipRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTooltip = registerComponent(ElTooltipPlus, { plugin: basicsPlugin, name: 'el-tooltip' });
export { ElTooltipPlus, ElTooltip, ElTooltipRegister, ElTooltipTriggerPlus };
export default ElTooltip;
