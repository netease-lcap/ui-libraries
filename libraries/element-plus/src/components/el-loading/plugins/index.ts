import _ from 'lodash';
import { useCallback } from '@/plugins/hooks';

export function handleCloseEvents(props) {
  const onBeforeClose = props.get('onBeforeClose', () => {});
  const onClosed = props.get('onClosed', () => {});
  const beforeClose = useCallback(
    _.wrap(onBeforeClose, (fn, ...args) => _.attempt(fn, ...args)),
    [onBeforeClose],
  );
  const closed = useCallback(
    _.wrap(onClosed, (fn, ...args) => _.attempt(fn, ...args)),
    [onClosed],
  );
  return {
    beforeClose,
    closed,
  };
}
