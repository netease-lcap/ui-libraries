import { RouterView } from 'vue-router';
import { registerComponent } from '@/plugins';
// import RouterView from './router-view';
import * as plugins from './plugins';
// import ElRouterView from './router-view';

export const ElRouterView = RouterView;
// export const ElRouterView = registerComponent(RouterView, plugins);

export default ElRouterView;
