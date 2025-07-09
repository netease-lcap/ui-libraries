import { Rate as VantRate } from 'vant';
import _ from 'lodash';
import { defineComponent } from 'vue';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanRateRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanRate = registerComponent(VantRate, { plugin: basicPlugin, name: 'van-rate' });
export { VantRate, VanRate, VanRateRegister };

export default VanRate;
