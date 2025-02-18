import { registerComponet } from '@/plugins';
import RouterView from './router-view';
import * as plugins from './plugins';

export const ElRouterView = registerComponet(RouterView, plugins);

export default ElRouterView;
