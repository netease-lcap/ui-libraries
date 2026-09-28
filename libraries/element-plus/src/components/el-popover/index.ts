import { ElPopover as ElPopoverPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElPopoverRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElPopover = registerComponent(ElPopoverPlus, { plugin: basicsPlugin, name: 'el-popover' });

export { ElPopoverPlus, ElPopover, ElPopoverRegister };
export const ElPopoverBasicsPlugin = basicsPlugin;
export default ElPopover;
