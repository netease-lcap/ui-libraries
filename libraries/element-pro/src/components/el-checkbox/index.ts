import { Checkbox, CheckboxGroup } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElCheckboxPro = registerComponent(Checkbox, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElCheckboxGroupPro = CheckboxGroup;

export default ElCheckboxPro;
