// import { Loading as VantLoading } from 'vant';
import _ from 'lodash';
import VantLoading from './loading';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanLoadingRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanLoading = registerComponent(VantLoading, {
  plugin: basicPlugin,
  name: 'van-loading',
});

export { VanLoading, VanLoadingRegister, VantLoading };
export default VanLoading;
