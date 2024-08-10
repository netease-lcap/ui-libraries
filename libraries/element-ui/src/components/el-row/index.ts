import Row from 'element-ui/lib/row';
import Col from 'element-ui/lib/col';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElRow = registerComponent(Row, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElCol = Col;

export default ElRow;
