

import Text from './text';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElText = registerComponent(Text, plugins);
export default ElText;
