import _ from 'lodash';
import { useControllableValue } from '@/plugins/hooks';
import { ElIcon } from '../../index';

export function handleDialogRef(props) {
  const [value, setValue, valueProps] = useControllableValue(props);
  const ref = props.get('ref');
  const closeIcon = props.get('closeIcon');
  const onBeforeClose = props.get('onBeforeClose');

  const closeIconComp = _.isNil(closeIcon) ? closeIcon : <ElIcon name={closeIcon} />;

  const beforeClose = _.isNil(onBeforeClose)
    ? onBeforeClose
    : _.wrap(onBeforeClose, (fn, ...args) => {
        _.attempt(fn, ...args);
      });

  return {
    ...valueProps,
    ref: {
      ...ref,
      open: () => setValue(true),
      close: () => setValue(false),
    },
    closeIcon: closeIconComp,
    beforeClose,
  };
}
