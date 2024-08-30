import { Select, Option, OptionGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElSelectPro = registerComponent(Select, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});
export const ElOptionPro = Option;
export const ElOptionGroupPro = OptionGroup;

export default ElSelectPro;
