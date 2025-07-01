import _ from 'lodash';
import Loading from './loading';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElLoadingRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElLoading = registerComponent(Loading, { plugin: basicsPlugin, name: 'el-loading' });
export { ElLoadingRegister, ElLoading };
export default ElLoading;
