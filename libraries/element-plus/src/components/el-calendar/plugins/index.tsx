import _ from 'lodash';
import dayjs from 'dayjs';
import { useMemo, useControllableValue } from '@/plugins/hooks';

export * from './ide';

export function handleRange(props) {
  const range = props.get('range') ?? '{}';
  const rangeProps = useMemo(() => {
    return _.isArray(range) ? { range: range.map((item) => new Date(item)) } : {};
  }, [range]);
  return _.assign({}, rangeProps);
}

export function handleValue(props) {
  const [value, setValue] = useControllableValue(props);
  const modelValue = useMemo(
    () => _.match(value)
        .when(_.isString, () => new Date(value))
        .when(_.isDate, () => value)
        .otherwise(() => value),
    [value],
  );
  return {
    modelValue,
    'onUpdate:modelValue': (value) => {
      setValue(dayjs(value).format('YYYY-MM-DD'));
    },
  };
}
