import { Radio, RadioGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElRadioGroupPro = registerComponent(RadioGroup, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  eventNames: ['change'],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElRadioPro = Radio;

export default ElRadioGroupPro;
