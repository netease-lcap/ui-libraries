import { TreeSelect as VantTreeSelect } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanTreeSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTreeSelect = VantTreeSelect;
export { VanTreeSelectRegister, VanTreeSelect, VantTreeSelect };
export default VanTreeSelect;
