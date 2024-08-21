import BackTop from 'element-ui/lib/BackTop';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElBackTop = registerComponent(BackTop, plugins, {
  nativeEvents: ['click'],
});

export default ElBackTop;
