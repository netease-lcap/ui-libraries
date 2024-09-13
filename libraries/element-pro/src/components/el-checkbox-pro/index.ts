import { Checkbox, CheckboxGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import './index.less';

export const ElCheckboxGroupPro = registerComponent(CheckboxGroup, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});
export const ElCheckboxPro = Checkbox;

export default ElCheckboxGroupPro;
