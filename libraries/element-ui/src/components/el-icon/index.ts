import 'remixicon/fonts/remixicon.css';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import Icon from './icon';
import * as plugins from './plugins';

export const ElIcon = registerComponent(Icon, plugins);
export default ElIcon;
