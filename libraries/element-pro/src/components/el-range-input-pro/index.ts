import { RangeInput, RangeInputPopup } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElRangeInputPro = registerComponent(RangeInput, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});
export const ElRangeInputPopupPro = RangeInputPopup;

export default ElRangeInputPro;
