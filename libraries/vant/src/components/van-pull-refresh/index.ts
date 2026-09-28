import { PullRefresh as VantPullRefresh } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanPullRefreshRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanPullRefresh = registerComponent(VantPullRefresh, {
  plugin: basicPlugin,
  name: 'van-pull-refresh',
});

export { VanPullRefresh, VanPullRefreshRegister, VantPullRefresh };
export default VanPullRefresh;
