import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import AbsoluteLayout from './absolute-layout';
import * as plugins from './plugins';

export const ElAbsoluteLayout = registerComponent(AbsoluteLayout, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElAbsoluteLayout;
