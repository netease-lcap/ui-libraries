import { registerComponent } from '@/plugins';
import RouterView from './router-view';
import * as plugins from './plugins';

export const ElRouterView = registerComponent(RouterView, plugins);

export default ElRouterView;
