import { ElAnchor as ElAnchorPlus, ElAnchorLink as ElAnchorLinkPlus } from 'element-plus';
import _ from 'lodash';
import AnchorItem from './el-anchor-item.vue';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';
import itemPlugins from './plugins/item-plugins';

function ElAnchorRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElAnchorLinkRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElAnchor = registerComponent(ElAnchorPlus, { plugin: basicsPlugin, name: 'el-anchor' });
const ElAnchorLink = registerComponent(ElAnchorLinkPlus, { plugin: itemPlugins, name: 'el-anchor-link' });

export const ElAnchorItem = AnchorItem;
export { ElAnchorPlus, ElAnchorLinkPlus, ElAnchor, ElAnchorLink, ElAnchorRegister, ElAnchorLinkRegister };
export default ElAnchor;
