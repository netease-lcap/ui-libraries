
import 'remixicon/fonts/remixicon.css';
import Icon from './icon';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElIcon = registerComponent(Icon, plugins);
export default ElIcon;
