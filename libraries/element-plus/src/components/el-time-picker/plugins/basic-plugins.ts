import _ from 'lodash';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { getNaslTimeValue, getFormatTimeValue, isValidStringTime } from './utils';

type GetTimeValueParams = {
  isEffectiveTime: boolean;
  isNilTime: boolean;
  isControlledTime: boolean;
  startValue: string;
  endValue: string;
  value: string[];
};

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
  const _value = props.get('value');
  const _setStateValue = props.get('onUpdate:value') ?? (() => {});
  const defaultValue = _value ? getFormatTimeValue(_value) : '';
  const [value, setValue] = useControllableValue(props, {
    // @ts-ignore
    defaultValue,
  });
  const result = {
    modelValue: value,
    'onUpdate:modelValue': _.wrap(setValue, (fn, val: any) => {
      const modelValue = _.isNil(val) ? undefined : new Date(dayjs(val).format()).toJSON();
      const naslValue = getNaslTimeValue(modelValue);
      _.attempt(fn, modelValue);
      _.attempt(_setStateValue, naslValue);
    }),
  };
  return isRange ? {} : result;
}

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleIcon(props) {
  const clearIcon = props.get('clearIcon');
  const prefixIcon = props.get('prefixIcon');
  const className = props.get('class') ?? '';

  return {
    class: `${className} el-time-picker`,
    clearIcon: clearIcon ? ElementPlusIconsVue[clearIcon] : null,
    prefixIcon: prefixIcon ? ElementPlusIconsVue[prefixIcon] : null,
  };
}
