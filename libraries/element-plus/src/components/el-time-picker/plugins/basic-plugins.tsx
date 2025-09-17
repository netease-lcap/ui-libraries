import _ from 'lodash';
import dayjs from 'dayjs';
import { TimePickerDefaultProps } from 'element-plus';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { getNaslTimeValue, getFormatTimeValue, isValidStringTime } from './utils';
import { getIsPreview, getRender, getFormatDateOrTime } from '@/plugins/common/preview';
import { getPropsIcon } from '@/plugins/common/icon';
import { ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { $deletePropsList } from '@/plugins/constants';
type GetTimeValueParams = {
  isEffectiveTime: boolean;
  isNilTime: boolean;
  isControlledTime: boolean;
  startValue: string;
  endValue: string;
  value: string[];
};

const TimePickerBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTimePickerOptions,
  TimePickerDefaultProps & {
    'onUpdate:startValue':(value: string) => void;
    'onUpdate:endValue': (value: string) => void;
  }
>();
export default TimePickerBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props) {
      const isRange = props.get('isRange');
      const className = props.get('class') ?? '';
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-time-picker',
        'is-range': isRange,
        tagName: 'el-time-picker',
        class: `${className} el-time-picker`,
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handleRangeDateValue',
    handle(props) {
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
      // const getTimeValue = _.cond([
      //   [_.matches({ isNilTime: true, isControlledTime: true }), _.constant([])],
      //   [_.matches({ isEffectiveTime: false }), _.constant([])],
      //   [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => value?.value],
      //   [_.stubTrue, ({ startValue, endValue }) => [getFormatTimeValue(startValue), getFormatTimeValue(endValue)]],
      // ]);
      // TODO
      const timeValue = useMemo(
        () => _.match({ isEffectiveTime, isNilTime, isControlledTime, startValue, endValue, value })
            .when(_.matches({ isNilTime: true, isControlledTime: true }), _.constant([]))
            .when(_.matches({ isEffectiveTime: false }), _.constant([]))
            .when(
              _.matches({ isControlledTime: false }),
              (value: GetTimeValueParams) => value?.value as unknown as Date[],
            )
            .otherwise(({ startValue, endValue }) => [getFormatTimeValue(startValue), getFormatTimeValue(endValue)]),

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
    },
  })
  .addPlugin({
    name: 'handleDateValue',
    handle(props) {
      const isRange = props.get('isRange');

      const [value, setValue] = useControllableValue(props);
      const result = {
        modelValue: value ? getFormatTimeValue(value) : '',
        'onUpdate:modelValue': _.wrap(setValue, (fn, val: any) => {
          const modelValue = val ? new Date(dayjs(val).format()).toJSON() : undefined;
          const naslValue = val ? getNaslTimeValue(modelValue) : undefined;
          _.attempt(fn, modelValue);
          _.attempt(setValue, naslValue);
        }),
      };
      return isRange ? {} : result;
    },
  })
  .addPlugin({
    name: 'handleDisabledFunction',
    handle(props) {
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
    },
  })
  .addPlugin({
    name: 'handleIcon',
    handle(props) {
      const prefixIconName = props.get('prefixIconName');
      return {
        clearIcon: getPropsIcon({ name: prefixIconName }),
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const { format = 'HH:mm:ss', modelValue } = insProps;
        const values = _.compact(_.castArray(modelValue));
        const previewText = inIDE || _.isEmpty(values) ? '-' : _.map(values, (v) => getFormatDateOrTime(v, format)).join(' ~ ');
        return <ElText text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  });
