import { Stepper as VanStepperOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanStepper = registerComponent(VanStepperOrigin, {
  plugin: plugins,
  name: 'van-stepper',
});

export default VanStepper; 
