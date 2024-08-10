import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElForm = registerComponent(Form, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['validate', 'validateField', 'resetFields', 'clearValidate'],
});
export const ElFormItem = FormItem;

export default ElForm;
