import Collapse from 'element-ui/lib/collapse';
import CollapseItem from 'element-ui/lib/collapse-item';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElCollapse = registerComponent(Collapse, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElCollapseItem = CollapseItem;

export default ElCollapse;
