/* 组件功能扩展插件 */
import _ from 'lodash';
import dayjs from 'dayjs';
import isNil from 'lodash';
import { useControllableValue } from '@/plugins/hooks';
import { useMemo } from '../../../plugins/hooks';

type GetTimeValueParams = {
  isEffectiveTime: boolean;
  isNilTime: boolean;
  isControlledTime: boolean;
  startValue: string;
  endValue: string;
  value: string[];
};

export function handleRange(props) {
  const type = props.get('type') ?? 'date';
  const isRange = type.includes('range');
  return {
    isRange,
  };
}
handleRange.order = 3;

const getTimeValue = _.cond([
  [_.matches({ isNilTime: true, isControlledTime: true }), _.constant([])],
  [_.matches({ isEffectiveTime: false }), _.constant([])],
  [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => [dayjs(value.value[0]), dayjs(value.value[1])]],
  [_.stubTrue, ({ startValue, endValue }) => [dayjs(startValue), dayjs(endValue)]],
]);
export function handleRangeDateValue(props) {
  const isRange = props.get('range');
  const startValue = props.get('startValue');
  const endValue = props.get('endValue');
  const setStartValue = props.get('onUpdate:startValue');
  const setEndValue = props.get('onUpdate:endValue');
  const isControlledTime = props.has('startValue') && props.has('endValue');
  const isEffectiveTime = isControlledTime ? dayjs(startValue).isValid() && dayjs(endValue).isValid() : false;
  const isNilTime = _.isNil(startValue) || _.isNil(endValue);
  const onChange = (value) => {
    const isValidDayjs = dayjs(value?.[0]).isValid() && dayjs(value?.[1]).isValid();
    const isUneffectiveValue = _.isNil(value) || _.isEmpty(value) || !isValidDayjs;
    const isEffectiveTime = isUneffectiveValue ? [] : _.map(value, (item) => new Date(item.format()).toJSON());
    _.attempt(setStartValue, isEffectiveTime[0]);
    _.attempt(setEndValue, isEffectiveTime[1]);
  };

  const [value, setValue] = useControllableValue(props);
  const timeValue = useMemo(
    () => getTimeValue({
        isEffectiveTime,
        isNilTime,
        isControlledTime,
        startValue,
        endValue,
        value,
      }),
    [isEffectiveTime, isNilTime, isControlledTime, startValue, endValue, value],
  );
  const rangeResult = {
    modelValue: timeValue,
    'onUpdate:modelValue': _.wrap(setValue, (fn, ...args) => {
      _.attempt(fn, ...args);
      _.attempt(onChange, ...args);
    }),
  };
  return isRange ? rangeResult : {};
}

export function handleDateValue(props) {
  const isRange = props.get('range');
  const [value, setValue] = useControllableValue(props);
  const result = {
    modelValue: value,
    'onUpdate:modelValue': _.wrap(setValue, (fn, value: any) => {
      const modelValue = _.isNil(value) || _.isEmpty(value) ? undefined : new Date(value.format()).toJSON();
      _.attempt(fn, modelValue);
    }),
  };
  return isRange ? {} : result;
}
