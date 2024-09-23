import Avatar from 'element-ui/lib/avatar';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElAvatar = registerComponent(Avatar, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElAvatar;
