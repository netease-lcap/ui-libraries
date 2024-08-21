import Checkbox from 'element-ui/lib/checkbox';
import CheckboxGroup from 'element-ui/lib/checkbox-group';
import CheckboxButton from 'element-ui/lib/checkbox-button';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElCheckbox = registerComponent(Checkbox, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElCheckboxGroup = CheckboxGroup;
export const ElCheckboxButton = CheckboxButton;

export default ElCheckbox;
