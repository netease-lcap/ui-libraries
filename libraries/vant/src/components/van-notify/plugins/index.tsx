import _ from 'lodash';
import { useControllableValue } from '@/plugins/hooks';

export function handleNotifyRef(props) {
  const [, setValue, valueProps] = useControllableValue(props, {
    valuePropName: 'show',
    defaultValue: false,
  });
  const ref = props.get('ref');

  return {
    ...valueProps,
    ref: _.assign({}, ref, {
      open: () => setValue(true),
      close: () => setValue(false),
    }),
  };
}
