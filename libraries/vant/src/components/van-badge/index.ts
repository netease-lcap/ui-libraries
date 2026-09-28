import { Badge as VantBadge } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanBadgeRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanBadge = registerComponent(VantBadge, { plugin: basicPlugin, name: 'van-badge' });
export { VantBadge, VanBadge, VanBadgeRegister };

export default VanBadge;
