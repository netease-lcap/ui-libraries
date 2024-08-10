import Image from 'element-ui/lib/image';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElImage = registerComponent(Image, plugins, {
  nativeEvents: [],
  slotNames: ['placeholder', 'error'],
  methodNames: [],
});

export default ElImage;
