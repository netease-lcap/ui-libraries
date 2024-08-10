import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import RouterView from './router-view';
import * as plugins from './plugins';

export const ElRouterView = registerComponent(RouterView, plugins);

export default ElRouterView;
