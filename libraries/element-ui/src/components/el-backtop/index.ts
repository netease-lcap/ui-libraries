import Backtop from 'element-ui/lib/backtop';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';
import BacktopDesigner from './designer.vue';

export const ElBacktopDesigner = BacktopDesigner;

export const ElBacktop = registerComponent(Backtop, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElBacktop;
