import { Radio, RadioGroup } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElRadioPro = registerComponent(Radio, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElRadioGroupPro = RadioGroup;

export default ElRadioPro;
