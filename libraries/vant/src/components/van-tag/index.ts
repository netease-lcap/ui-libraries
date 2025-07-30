import { Tag as VantTag } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanTagRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTag = registerComponent(VantTag, { plugin: basicPlugin, name: 'van-tag' });
export { VantTag, VanTag, VanTagRegister };

export default VanTag;
