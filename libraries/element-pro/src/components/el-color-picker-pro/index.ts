import { ColorPicker } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElColorPickerPro = registerComponent(ColorPicker, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElColorPickerPro;
