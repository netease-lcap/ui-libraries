import { SelectInput } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElSelectInputPro = registerComponent(SelectInput, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSelectInputPro;
