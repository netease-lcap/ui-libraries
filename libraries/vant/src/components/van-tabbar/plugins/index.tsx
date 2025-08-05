import _ from 'lodash';
import { useMemo, useControllableValue } from '@/plugins/hooks';

export function handleCustomProps(props: any) {
  let isFixed = props.get('isFixed');
  isFixed = _.isNil(isFixed) ? false : isFixed;
  return {
    fixed: isFixed,
  };
}

export function handleModelValue(props: any) {
  const [value, setValue] = useControllableValue(props);
  const currentValue = useMemo(() => {
    return value;
  }, [value]);
  return {
    modelValue: currentValue,
    'onUpdate:modelValue': (value) => {
      setValue(value);
    },
  };
}
