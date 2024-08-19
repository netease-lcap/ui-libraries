import Row from 'element-ui/lib/row';
import Col from 'element-ui/lib/col';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as Plugins from './plugins';
import * as ColPlugins from './plugins/col-plugins';

export const ElRow = registerComponent(Row, Plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElCol = registerComponent(Col, ColPlugins, {
});

export default ElRow;
