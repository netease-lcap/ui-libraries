import Select from 'element-ui/lib/select';
import OptionGroup from 'element-ui/lib/option-group';
import Option from 'element-ui/lib/option';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElSelect = registerComponent(Select, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'prefix', 'empty'],
  methodNames: ['focus', 'blur'],
});
export const ElOptionGroup = OptionGroup;
export const ElOption = Option;

export default ElSelect;
