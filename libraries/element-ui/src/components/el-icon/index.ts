import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import Icon from './icon';
import * as plugins from './plugins';

export const ElIcon = registerComponent(Icon, plugins);
export default ElIcon;
