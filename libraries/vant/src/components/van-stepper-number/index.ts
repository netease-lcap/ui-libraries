import { Stepper as VanStepperOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

export const VanStepperNumber = registerComponent(VanStepperOrigin, {
  plugin: plugins,
  name: 'van-stepper-number',
});
export const VanFormStepperNumber = withFormItem(VanStepperNumber, 'van-form-stepper-number');

export default VanStepperNumber;
