import { ElTimeline as ElTimelinePlus, ElTimelineItem as ElTimelineItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElTimelineRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTimelineItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTimeline = registerComponent(ElTimelinePlus, { plugin: basicsPlugin });
const ElTimelineItem = registerComponent(ElTimelineItemPlus, { plugin: basicsPlugin });

ElTimeline.BaseComponent = ElTimelinePlus;
ElTimelineItem.BaseComponent = ElTimelineItemPlus;

export { ElTimelinePlus, ElTimelineItemPlus, ElTimeline, ElTimelineItem, ElTimelineRegister, ElTimelineItemRegister };
export default ElTimeline;
