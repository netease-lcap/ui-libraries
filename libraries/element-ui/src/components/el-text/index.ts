import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import Text from './text';
import * as plugins from './plugins';

export const ElText = registerComponent(Text, plugins);
export default ElText;
