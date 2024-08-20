import { InputAdornment } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElInputAdornmentPro = registerComponent(InputAdornment, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElInputAdornmentPro;
