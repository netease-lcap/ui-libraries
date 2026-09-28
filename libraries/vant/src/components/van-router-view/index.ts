import { RouterView } from 'vue-router';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanRouterViewRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanRouterView = RouterView;

export { VanRouterViewRegister, VanRouterView };
export default VanRouterView; 