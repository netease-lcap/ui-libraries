import _ from 'lodash';
import { useCallback, useControllableValue } from '@/plugins/hooks';

export function handleDialogRef(props) {
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

export function handleDialogFooter(props) {
  const slots = props.get('slots');
  const useCustomFooter = props.get('useCustomFooter', false);

  return {
    slots: _.assign({}, slots, {
      footer: useCustomFooter ? slots.footer : null,
    }),
  };
}
