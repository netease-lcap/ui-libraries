import _ from 'lodash';
import { useCallback, useControllableValue } from '@/plugins/hooks';

export function handlePopupRef(props) {
  const [, setValue, valueProps] = useControllableValue(props, {
    valuePropName: 'show',
    defaultValue: false,
  });
  const ref = props.get('ref');
  const onBeforeClose = props.get('onBeforeClose', () => true);
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
}
