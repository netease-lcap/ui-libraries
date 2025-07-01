import _ from 'lodash';
import { useCallback, useControllableValue } from '@/plugins/hooks';
import { getPropsIcon } from '@/plugins/common/icon';

export function handleDialogRef(props) {
  const [, setValue, valueProps] = useControllableValue(props);
  const ref = props.get('ref');
  const closeIcon = props.get('closeIcon');
  const onBeforeClose = props.get('onBeforeClose', () => {});
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
    closeIcon: getPropsIcon(closeIcon),
    beforeClose,
  };
}
