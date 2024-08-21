import { Slider } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElSliderPro = registerComponent(Slider, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSliderPro;
