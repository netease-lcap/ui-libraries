import { ElTimeline as ElTimelinePlus, ElTimelineItem as ElTimelineItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';
import itemPlugins from './plugins/item-plugins';

function ElTimelineRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTimelineItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimeline = registerComponent(ElTimelinePlus, { plugin: basicsPlugin, name: 'el-timeline' });
const ElTimelineItem = registerComponent(ElTimelineItemPlus, { plugin: itemPlugins, name: 'el-timeline-item' });

export { ElTimelinePlus, ElTimelineItemPlus, ElTimeline, ElTimelineItem, ElTimelineRegister, ElTimelineItemRegister };
export const ElTimelineBasicsPlugin = basicsPlugin;
export const ElTimelineItemBasicsPlugin = itemPlugins;
export default ElTimeline;
