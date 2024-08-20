import { SelectInput } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElSelectInputPro = registerComponent(SelectInput, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSelectInputPro;
