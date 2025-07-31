import { Popover as VantPopoverCombination } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanPopoverCombinationRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanPopoverCombination = registerComponent(VantPopoverCombination, {
  plugin: basicPlugin,
  name: 'van-popover-combination',
});

export { VanPopoverCombination, VanPopoverCombinationRegister, VantPopoverCombination };
export default VanPopoverCombination;
