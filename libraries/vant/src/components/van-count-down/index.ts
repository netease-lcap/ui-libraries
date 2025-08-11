import { CountDown as VantCountDown } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

function VanCountDownRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCountDown = registerComponent(VantCountDown, { plugin: basicPlugin });
export { VanCountDownRegister, VanCountDown, VantCountDown };
export default VanCountDown;
