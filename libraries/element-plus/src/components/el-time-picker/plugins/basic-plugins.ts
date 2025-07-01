import _ from 'lodash';
import dayjs from 'dayjs';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { getNaslTimeValue, getFormatTimeValue, isValidStringTime } from './utils';
import { getPropsIcon } from '@/plugins/common/icon';

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

type GetTimeValueParams = {
  isEffectiveTime: boolean;
  isNilTime: boolean;
  isControlledTime: boolean;
  startValue: string;
  endValue: string;
  value: string[];
};

// TODO
const getTimeValue = _.cond([
  [_.matches({ isNilTime: true, isControlledTime: true }), _.constant([])],
  [_.matches({ isEffectiveTime: false }), _.constant([])],
  [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => value?.value],
  [_.stubTrue, ({ startValue, endValue }) => [getFormatTimeValue(startValue), getFormatTimeValue(endValue)]],
]);

export function handleRangeDateValue(props) {
  const isRange = props.get('isRange');
  const startValue = props.get('startValue');
  const endValue = props.get('endValue');
  const format = props.get('format');
  const setStartValue = props.get('onUpdate:startValue') ?? (() => {});
  const setEndValue = props.get('onUpdate:endValue') ?? (() => {});
  const isControlledTime = props.has('startValue') && props.has('endValue');
  const isEffectiveTime = isControlledTime ? isValidStringTime(startValue) && isValidStringTime(endValue) : true;
  const isNilTime = _.isNil(startValue) || _.isNil(endValue);

  const onChange = (value) => {
    const isValidDayjs = dayjs(value?.[0]).isValid() && dayjs(value?.[1]).isValid();
    const isUneffectiveValue = _.isNil(value) || _.isEmpty(value) || !isValidDayjs;
    const isEffectiveTime = isUneffectiveValue ? [] : _.map(value, (item) => getNaslTimeValue(item, format));

    _.attempt(setStartValue, isEffectiveTime[0]);
    _.attempt(setEndValue, isEffectiveTime[1]);
  };

  const [value, setValue] = useControllableValue(props);
  // TODO 修复类型
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
  const isRange = props.get('isRange');
  const [value, setValue] = useControllableValue(props);
  const result = {
    modelValue: value ? getFormatTimeValue(value) : '',
    'onUpdate:modelValue': _.wrap(setValue, (fn, val: any) => {
      const modelValue = _.isNil(val) ? undefined : new Date(dayjs(val).format()).toJSON();
      const naslValue = getNaslTimeValue(modelValue);
      _.attempt(fn, modelValue);
      _.attempt(setValue, naslValue);
    }),
  };
  return isRange ? {} : result;
}

export function handleTagName(props) {
  const className = props.get('class') ?? '';
  return {
    formTagName: 'el-form-time-picker',
    class: `${className} el-time-picker`,
  };
}
export function handleDisabledFunction(props) {
  const disabledHours = props.get('disabledHours') ?? (() => []);
  const disabledMinutes = props.get('disabledMinutes') ?? (() => []);
  const disabledSeconds = props.get('disabledSeconds') ?? (() => []);

  return {
    disabledHours: _.wrap(disabledHours, (fn, timeRole, comparingDate: dayjs.Dayjs) => {
      const resultComparingDate = comparingDate ? comparingDate.format('YYYY-MM-DD HH:mm:ss') : comparingDate;
      return _.attempt(fn, timeRole, resultComparingDate);
    }),
    disabledMinutes: _.wrap(disabledMinutes, (fn, hour, timeRole, comparingDate: dayjs.Dayjs) => {
      const resultComparingDate = comparingDate ? comparingDate.format('YYYY-MM-DD HH:mm:ss') : comparingDate;
      return _.attempt(fn, hour, timeRole, resultComparingDate);
    }),
    disabledSeconds: _.wrap(disabledSeconds, (fn, hour, minute, timeRole, comparingDate: dayjs.Dayjs) => {
      const resultComparingDate = comparingDate ? comparingDate.format('YYYY-MM-DD HH:mm:ss') : comparingDate;
      return _.attempt(fn, hour, minute, timeRole, resultComparingDate);
    }),
  };
}

export function handleIcon(props) {
  const prefixIconName = props.get('prefixIconName');
  const clearIconName = props.get('clearIconName');
  return {
    prefixIcon: getPropsIcon({ name: prefixIconName }),
    clearIcon: getPropsIcon({ name: clearIconName }),
  };
}
