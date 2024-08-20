import { TagInput } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTagInputPro = registerComponent(TagInput, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElTagInputPro;
