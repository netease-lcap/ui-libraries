import { ElTimeline as ElTimelinePlus, ElTimelineItem as ElTimelineItemPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElTimeline = registerComponent(ElTimelinePlus, { plugin: basicsPlugin });

export const ElTimelineItem = registerComponent(ElTimelineItemPlus, { plugin: basicsPlugin });

export default ElTimeline;
