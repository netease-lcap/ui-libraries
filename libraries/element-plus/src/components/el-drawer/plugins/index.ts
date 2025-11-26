import _ from 'lodash';
import { DrawerProps } from 'element-plus';
import { useCallback, useControllableValue } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const DrawerBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElDrawerOptions, DrawerProps>();


export default DrawerBasicAccumulate.addPlugin({
  name: 'handleDrawerRef',
  handle: (props) => {
    const [, setValue, valueProps] = useControllableValue(props);
    const ref = props.get('ref');
    const onBeforeClose = props.get('onBeforeClose', (done) => _.attempt(done));
    const beforeClose = useCallback(
      _.wrap(onBeforeClose, (fn, ...args) => _.attempt(fn, ...args)),
      [onBeforeClose],
    );

    return {
      ...valueProps,
      ref: _.assign({}, ref, {
        open: () => setValue(true),
        close: () => setValue(false),
      }),
      beforeClose,
    };
  },
});
