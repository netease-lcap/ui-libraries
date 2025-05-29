import { ElAnchor as ElAnchorPlus, ElAnchorLink as ElAnchorLinkPlus } from 'element-plus';
import AnchorItem from './el-anchor-item.vue';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

export const ElAnchor = registerComponent(ElAnchorPlus, { plugin: basicsPlugin });
export const ElAnchorLink = registerComponent(ElAnchorLinkPlus, { plugin: itemPlugins });
export const ElAnchorItem = AnchorItem;

export default ElAnchor;
