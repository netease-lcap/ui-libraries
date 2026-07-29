import { TimelineItemProps } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { getPropsIcon } from '@/plugins/common/icon';

const ElTimelineItemBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTimelineItemOptions, TimelineItemProps>();

export default ElTimelineItemBasicAccumulate.addPlugin({
  name: 'handleIcon',
  handle(props) {
    const icon = props.get('icon');

    return {
      icon: getPropsIcon({ name: icon }),
    };
  },
});
