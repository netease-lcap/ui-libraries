import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import AbsoluteLayout from './absolute-layout';
import * as plugins from './plugins';

export const ElAbsoluteLayout = registerComponent(AbsoluteLayout, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElAbsoluteLayout;
