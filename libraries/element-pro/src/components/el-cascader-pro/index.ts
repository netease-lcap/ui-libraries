import { Cascader } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElCascaderPro = registerComponent(Cascader, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElCascaderPro;
