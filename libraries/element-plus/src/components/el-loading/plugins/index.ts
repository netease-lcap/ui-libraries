import _ from 'lodash';
import { useCallback } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { ElLoadingProps } from '../props';

const LoadingBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElLoadingOptions, ElLoadingProps>();

export default LoadingBasicAccumulate.addPlugin({
  name: 'handleCloseEvents',
  handle(props) {
    const onBeforeClose = props.get('onBeforeClose', () => {});
    const onClosed = props.get('onClosed', () => {});
    const beforeClose = useCallback(
      _.wrap(onBeforeClose, (fn, ...args) => _.attempt(fn as any, ...args)),
      [onBeforeClose],
    );
    const closed = useCallback(
      _.wrap(onClosed, (fn, ...args) => _.attempt(fn as any, ...args)),
      [onClosed],
    );
    return {
      beforeClose,
      closed,
    };
  },
});
