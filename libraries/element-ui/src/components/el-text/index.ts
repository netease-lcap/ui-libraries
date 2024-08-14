import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import Text from './text';
import * as plugins from './plugins';

export const ElText = registerComponent(Text, plugins);
export default ElText;
