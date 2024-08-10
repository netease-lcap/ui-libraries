import Avatar from 'element-ui/lib/avatar';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElAvatar = registerComponent(Avatar, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElAvatar;
