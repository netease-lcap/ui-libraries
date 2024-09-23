import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import RouterView from './router-view';
import * as plugins from './plugins';

export const ElRouterView = registerComponent(RouterView, plugins);

export default ElRouterView;
