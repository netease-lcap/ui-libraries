import _ from 'lodash';
import { DialogProps } from 'element-plus';
import { useCallback, useControllableValue } from '@/plugins/hooks';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const DialogBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElDialogOptions, DialogProps>();

export default DialogBasicAccumulate.addPlugin({
  name: 'handleDialogRef',
  handle: (props) => {
    const [, setValue, valueProps] = useControllableValue(props);
    const ref = props.get('ref');
    const closeIcon = props.get('closeIcon');
    const onBeforeClose = props.get('onBeforeClose');

    const beforeClose = useCallback(
      onBeforeClose ? _.wrap(onBeforeClose, (fn, ...args) => _.attempt(fn, ...args)) : () => {},
      [onBeforeClose],
    );

    return {
      ...valueProps,
      ref: _.assign({}, ref, {
        open: () => setValue(true),
        close: () => setValue(false),
      }),

      closeIcon: getPropsIcon({ name: closeIcon }),
      beforeClose,
    };
  },
});
