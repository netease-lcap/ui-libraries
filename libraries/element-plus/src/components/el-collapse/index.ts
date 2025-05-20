import { ElCollapse as ElCollapsePlus, ElCollapseItem as ElCollapseItemPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

const ElCollapse = registerComponent(ElCollapsePlus, { plugin: basicsPlugin });
const ElCollapseItem = registerComponent(ElCollapseItemPlus, { plugin: itemPlugins });

export { ElCollapse, ElCollapseItem };
export default ElCollapse;
