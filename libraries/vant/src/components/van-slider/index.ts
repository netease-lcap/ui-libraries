import { Slider as VanSliderOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

export const VanSlider = registerComponent(VanSliderOrigin, {
  plugin: plugins,
  name: 'van-slider',
});

export const VanFormSlider = withFormItem(VanSlider, {
  name: 'van-form-slider',
});

export default VanSlider;
