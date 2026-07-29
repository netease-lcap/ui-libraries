import { Empty as VantEmpty } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanEmptyRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanEmpty = registerComponent(VantEmpty, { plugin: basicPlugin, name: 'van-empty' });
export { VantEmpty, VanEmpty, VanEmptyRegister };

export default VanEmpty;
