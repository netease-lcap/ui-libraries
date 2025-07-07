// /* 组件功能扩展插件 */
import _ from 'lodash';
import dayjs from 'dayjs';
import { useControllableValue } from '@/plugins/hooks';
import { useMemo } from '../../../plugins/hooks';
import { FORM_TAG_NAME } from '../constants';
import { getIsPreview, getRender, getFormatDateOrTime } from '@/plugins/common/preview';

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
  [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => _.map(value.value, (item) => dayjs(item))],
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
    ? _.every([startValue, endValue], (item) => dayjs(item).isValid())
    : _.every(value, (item) => dayjs(item).isValid());
  const isNilTime = isControlledTime
    ? _.some([startValue, endValue], (item) => _.isNil(item))
    : _.some(value, (item) => _.isNil(item));
  const onChange = (value) => {
    const isValidDayjs = _.every(value, (item) => dayjs(item).isValid());
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

export function handleTagName() {
  return {
    formTagName: FORM_TAG_NAME,
  };
}

export { handleIcon } from '@/plugins/common/icon';

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  const isPreview = getIsPreview(props);

  const previewRender = (insProps) => {
    const inIDE = !!props.get('data-nodepath');
    const { format = 'YYYY-MM-DD', modelValue } = insProps;
    const values = _.compact(_.castArray(modelValue));
    const previewText =
      inIDE || _.isEmpty(values) ? '-' : _.map(values, (v) => getFormatDateOrTime(v, format)).join(' ~ ');
    return <el-text text={previewText}></el-text>;
  };

  const { render, insRef } = getRender(Component, previewRender, isPreview);

  return {
    ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    render,
  };
}
