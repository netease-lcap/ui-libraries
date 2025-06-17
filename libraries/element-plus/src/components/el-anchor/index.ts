import { ElAnchor as ElAnchorPlus, ElAnchorLink as ElAnchorLinkPlus } from 'element-plus';
import _ from 'lodash';
import AnchorItem from './el-anchor-item.vue';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

function ElAnchorRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElAnchorLinkRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElAnchor = registerComponent(ElAnchorPlus, { plugin: basicsPlugin });
const ElAnchorLink = registerComponent(ElAnchorLinkPlus, { plugin: itemPlugins });

ElAnchor.BaseComponent = ElAnchorPlus;
ElAnchorLink.BaseComponent = ElAnchorLinkPlus;

export const ElAnchorItem = AnchorItem;
export { ElAnchorPlus, ElAnchorLinkPlus, ElAnchor, ElAnchorLink, ElAnchorRegister, ElAnchorLinkRegister };
export default ElAnchor;
