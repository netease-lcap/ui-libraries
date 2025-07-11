import { BackTop as VantBackTop } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanBackTopRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanBackTop = VantBackTop;
export { VanBackTopRegister, VanBackTop, VantBackTop };
export default VanBackTop;
