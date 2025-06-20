import { ElPopover as ElPopoverPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElPopoverRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElPopover = registerComponent(ElPopoverPlus, { plugin: basicsPlugin });

export { ElPopoverPlus, ElPopover, ElPopoverRegister };
export default ElPopover;
