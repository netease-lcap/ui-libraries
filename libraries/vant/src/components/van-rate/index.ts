import { Rate as VantRate } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

import './index.css';

function VanRateRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanRate = registerComponent(VantRate, { plugin: basicPlugin, name: 'van-rate' });
const VanFormRate = withFormItem(VanRate, 'van-form-rate');

export { VantRate, VanRate, VanRateRegister, VanFormRate };

export default VanRate;
