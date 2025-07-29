import { Toast as VantToast } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanToastRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanToast = registerComponent(VantToast, {
  plugin: basicPlugin,
  name: 'van-toast',
});

export { VanToast, VanToastRegister, VantToast };
export default VanToast;
