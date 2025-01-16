import Popconfirm from 'element-ui/lib/popconfirm';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElPopconfirm = registerComponent(Popconfirm, plugins, {
  nativeEvents: ['click'],
  slotNames: ['reference'],
  methodNames: [],
});

export default ElPopconfirm;
