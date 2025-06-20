import { RouterView } from 'vue-router';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
// import RouterView from './router-view';
// import * as plugins from './plugins';
// import ElRouterView from './router-view';

function ElRouterViewRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRouterView = RouterView;

export { ElRouterViewRegister, ElRouterView };
export default ElRouterView;
