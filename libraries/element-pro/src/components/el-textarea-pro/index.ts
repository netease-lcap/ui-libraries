import { Textarea } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElTextareaPro = registerComponent(Textarea, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTextareaPro;
