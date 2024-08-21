import ColorPicker from 'element-ui/lib/color-picker';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElColorPicker = registerComponent(ColorPicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElColorPicker;
