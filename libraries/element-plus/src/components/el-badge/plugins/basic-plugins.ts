import _ from 'lodash';
import { BadgeInstance } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useSyncState, useCurrentInstanceValue } from '@/plugins/hooks';
// import { getCurrentInstance } from 'vue';

const BadgeAccumulate = new PluginAccumulateTypes<nasl.ui.ElBadgeOptions, BadgeInstance['$props']>();

export default BadgeAccumulate.addPlugin({
  name: 'handleLeftOffset',
  handle: (props) => {
    const leftOffset = props.get('leftOffset') ?? 0;
    const topOffset = props.get('topOffset') ?? 0;
    const offsetProps = useCurrentInstanceValue('offset');

    const offset = _.isArray(offsetProps) ? offsetProps : [leftOffset, topOffset];
    return {
      offset,
    };
  },
}).addPlugin({
  name: 'handleSyncState',
  handle: (props) => {
    useSyncState(props, 'value');
    return {};
  },
});
