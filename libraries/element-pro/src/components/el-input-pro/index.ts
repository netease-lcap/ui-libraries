import { Input, InputGroup } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElInputPro = registerComponent(Input, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElInputGroupPro = InputGroup;

export default ElInputPro;
