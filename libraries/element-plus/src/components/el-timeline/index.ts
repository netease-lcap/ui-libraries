import { ElTimeline as ElTimelinePlus, ElTimelineItem as ElTimelineItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

function ElTimelineRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTimelineItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimeline = registerComponent(ElTimelinePlus, { plugin: basicsPlugin });
const ElTimelineItem = registerComponent(ElTimelineItemPlus, { plugin: itemPlugins });


export { ElTimelinePlus, ElTimelineItemPlus, ElTimeline, ElTimelineItem, ElTimelineRegister, ElTimelineItemRegister };
export default ElTimeline;
