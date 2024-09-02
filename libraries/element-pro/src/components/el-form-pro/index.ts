import { Form, FormItem } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import { LCAP_FORM_ITEM_NAME, LCAP_FORM_NAME } from './constants';
import * as plugins from './plugins';
import * as itemPlugins from './plugins/item-plugins';

import './index.less';

export const ElFormPro = registerComponent(Form, plugins, {
  name: LCAP_FORM_NAME,
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['clearValidate', 'submit'],
});
export const ElFormItemPro = registerComponent(FormItem, itemPlugins, {
  name: LCAP_FORM_ITEM_NAME,
  slotNames: ['default'],
});

export default ElFormPro;
