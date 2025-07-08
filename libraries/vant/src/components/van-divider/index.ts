import { Divider as VantDivider } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanDividerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanDivider = registerComponent(VantDivider, { plugin: basicPlugin, name: 'van-divider' });
export { VantDivider, VanDivider, VanDividerRegister };

export default VanDivider; 