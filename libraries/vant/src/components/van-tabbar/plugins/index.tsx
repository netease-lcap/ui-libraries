import _ from 'lodash';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

export function handleCustomProps(props: any) {
  let isFixed = props.get('isFixed');
  isFixed = _.isNil(isFixed) ? false : isFixed;
  const deletePropsList = props
  .get($deletePropsList, [])
  .concat(['isFixed']);
  return {
    fixed: isFixed,
    [$deletePropsList]: deletePropsList,
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
