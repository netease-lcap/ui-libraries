import { Form, FormItem } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElFormPro = registerComponent(Form, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElFormItemPro = FormItem;

export default ElFormPro;
