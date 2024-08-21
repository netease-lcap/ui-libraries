import Alert from 'element-ui/lib/alert';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElAlert = registerComponent(Alert, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'title'],
  methodNames: [],
});

export default ElAlert;
