import { Slider as VanSliderOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanSlider = registerComponent(VanSliderOrigin, {
  plugin: plugins,
  name: 'van-slider',
});

export default VanSlider; 
