import { Radio, RadioGroup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import * as radioPlugins from './plugins/radio-plugins';
import './index.less';

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

export const ElRadioPro = registerComponent(Radio, radioPlugins, {});

export default ElRadioGroupPro;
