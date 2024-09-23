import Timeline from 'element-ui/lib/timeline';
import TimelineItem from 'element-ui/lib/timeline-item';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';
import * as Itemplugins from './plugins/item-plugin';

export const ElTimeline = registerComponent(Timeline, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElTimelineItem = registerComponent(TimelineItem, Itemplugins, {
  slotNames: ['dot'],
});

export default ElTimeline;
