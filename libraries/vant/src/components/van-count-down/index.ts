import { CountDown as VantCountDown } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanCountDownRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCountDown = VantCountDown;
export { VanCountDownRegister, VanCountDown, VantCountDown };
export default VanCountDown;
