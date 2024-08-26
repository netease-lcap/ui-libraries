import { Form, FormItem } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import * as itemPlugins from './plugins/item-plugins';

export const ElFormPro = registerComponent(Form, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['clearValidate', 'reset', 'submit'],
});
export const ElFormItemPro = registerComponent(FormItem, itemPlugins, {
  slotNames: ['default'],
});

export default ElFormPro;
