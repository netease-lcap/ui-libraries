// /* 组件功能扩展插件 */
import _ from 'lodash';
import dayjs from 'dayjs';
import { useControllableValue } from '@/plugins/hooks';
import { useMemo } from '../../../plugins/hooks';
import { FORM_TAG_NAME } from '../constants';

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
    range: isRange,
  };
}
handleRange.order = 3;

const getTimeValue = _.cond([
  [_.matches({ isNilTime: true }), _.constant([])],
  [_.matches({ isEffectiveTime: false }), _.constant([])],
  [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => [dayjs(value.value[0]), dayjs(value.value[1])]],
  [_.stubTrue, ({ startValue, endValue }) => [dayjs(startValue), dayjs(endValue)]],
]);
export function handleRangeDateValue(props) {
  const isRange = props.get('range');
  const startValue = props.get('startValue');
  const endValue = props.get('endValue');
  const setStartValue = props.get('onUpdate:startValue') ?? (() => {});
  const setEndValue = props.get('onUpdate:endValue') ?? (() => {});
  const isControlledTime = props.has('startValue') && props.has('endValue');
  const [value, setValue] = useControllableValue(props);
  const isEffectiveTime = isControlledTime
    ? dayjs(startValue).isValid() && dayjs(endValue).isValid()
    : _.every(value, (item) => dayjs(item).isValid());
  const isNilTime = isControlledTime ? _.isNil(startValue) || _.isNil(endValue) : _.isEmpty(value);
  const onChange = (value) => {
    const isValidDayjs = dayjs(value?.[0]).isValid() && dayjs(value?.[1]).isValid();
    const isUnEffectiveValue = _.isNil(value) || _.isEmpty(value) || !isValidDayjs;
    const effectiveTime = isUnEffectiveValue ? [] : _.map(value, (item) => dayjs(item).toJSON());
    _.attempt(setStartValue, effectiveTime[0]);
    _.attempt(setEndValue, effectiveTime[1]);
  };

  const timeValue = useMemo(
    () =>
      getTimeValue({
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
    'onUpdate:modelValue': _.wrap(setValue, (fn, time: any) => {
      _.attempt(fn, time);
      _.attempt(onChange, time);
    }),
  };
  return isRange ? rangeResult : {};
}

export function handleDateValue(props) {
  const isRange = props.get('range');
  const [value, setValue] = useControllableValue(props);
  const result = {
    modelValue: value,
    'onUpdate:modelValue': _.wrap(setValue, (fn, time: Date | Array<Date> | null) => {
      // const modelValue = _.isNil(time) ? undefined : new Date(time).toJSON();
      // _.attempt(fn, modelValue);
      _.attempt(fn, time);
    }),
  };
  return isRange ? {} : result;
}

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleTagName(props) {
  return {
    formTagName: FORM_TAG_NAME,
  };
}
