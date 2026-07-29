import _ from 'lodash';
import { registerComponent } from '@/plugins';
import RouterView from './router-view';
import basicsPlugin from './plugins';

function ElRouterViewRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRouterView = registerComponent(RouterView, {
  plugin: basicsPlugin,
  name: 'el-router-view',
});

export { ElRouterView, ElRouterViewRegister };
export const ElRouterViewBasicsPlugin = basicsPlugin;
export default ElRouterView;
