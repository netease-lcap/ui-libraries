import Slider from 'element-ui/lib/slider';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElSlider = registerComponent(Slider, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElSlider;
