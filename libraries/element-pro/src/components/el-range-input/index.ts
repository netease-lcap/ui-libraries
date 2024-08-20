import { RangeInput, RangeInputPopup } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElRangeInputPro = registerComponent(RangeInput, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElRangeInputPopupPro = RangeInputPopup;

export default ElRangeInputPro;
