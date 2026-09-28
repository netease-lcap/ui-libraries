import { Circle as VantCircle } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanCircleRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCircle = registerComponent(VantCircle, { plugin: basicPlugin, name: 'van-circle' });
export { VantCircle, VanCircle, VanCircleRegister };

export default VanCircle;
