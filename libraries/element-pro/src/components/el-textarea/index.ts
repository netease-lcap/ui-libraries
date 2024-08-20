import { Textarea } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTextareaPro = registerComponent(Textarea, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTextareaPro;
