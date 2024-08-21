import { Input, InputGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElInputPro = registerComponent(Input, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElInputGroupPro = InputGroup;

export default ElInputPro;
