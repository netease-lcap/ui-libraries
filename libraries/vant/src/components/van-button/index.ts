import { Button as VantButton } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanButtonRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanButton = registerComponent(VantButton, { plugin: basicPlugin, name: 'van-button' });
export { VantButton, VanButton, VanButtonRegister };

export default VanButton;
