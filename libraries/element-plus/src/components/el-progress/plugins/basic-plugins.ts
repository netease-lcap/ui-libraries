/* 组件功能扩展插件 */
import _ from 'lodash';
import { ProgressProps } from 'element-plus';
import { useCallback, useSyncState } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ProgressBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElProgressOptions, ProgressProps>();
export default ProgressBasicAccumulate.addPlugin({
  name: 'handleFormatFunction',
  handle(props) {
    const formatProps = props.get('format', undefined);
    const format = useCallback(
      _.wrap(formatProps, (fn, ...args) => _.attempt(fn as any, ...args) ?? undefined),
      [formatProps],
    );

    return {
      format,
    };
  },
}).addPlugin({
  name: 'handleSyncState',
  handle(props) {
    useSyncState(props, 'percentage');
    return {};
  },
});
