import { PasswordInput as VantPasswordInput } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanPasswordInputRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanPasswordInput = registerComponent(VantPasswordInput, { plugin: basicPlugin, name: 'van-password-input' });
export { VantPasswordInput, VanPasswordInput, VanPasswordInputRegister };

export default VanPasswordInput;
