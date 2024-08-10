import Timeline from 'element-ui/lib/timeline';
import TimelineItem from 'element-ui/lib/timeline-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElTimeline = registerComponent(Timeline, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElTimelineItem = TimelineItem;

export default ElTimeline;
