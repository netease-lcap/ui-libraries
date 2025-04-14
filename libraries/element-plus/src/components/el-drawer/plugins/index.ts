import _ from 'lodash';
import { useControllableValue } from '@/plugins/hooks';

export function handleDrawerRef(props) {
  const [value, setValue, valueProps] = useControllableValue(props);
  const ref = props.get('ref');
  const onBeforeClose = props.get('onBeforeClose');

  const beforeClose = _.isNil(onBeforeClose)
    ? onBeforeClose
    : _.wrap(onBeforeClose, (fn, done) => {
        _.attempt(fn, done);
      });

  return {
    ...valueProps,
    ref: {
      ...ref,
      open: () => setValue(true),
      close: () => setValue(false),
    },
    beforeClose,
  };
}
