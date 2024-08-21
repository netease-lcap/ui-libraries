import { InputAdornment } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElInputAdornmentPro = registerComponent(InputAdornment, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElInputAdornmentPro;
