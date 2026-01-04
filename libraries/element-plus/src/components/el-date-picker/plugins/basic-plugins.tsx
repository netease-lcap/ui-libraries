// /* 组件功能扩展插件 */
import _ from 'lodash';
import dayjs from 'dayjs';
import { DatePickerProps } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { useControllableValue, useMemo, useSyncState } from '@/plugins/hooks';
import { getIsPreview, getRender, getFormatDateOrTime } from '@/plugins/common/preview';
import { ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleIcon } from '@/plugins/common/icon';

const DatePickerBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElDatePickerOptions<any, any, any, any, any> & {
    'onUpdate:startValue':(value: string) => void;
    'onUpdate:endValue': (value: string) => void;
  },
  DatePickerProps & {
    'onUpdate:startValue': (value: string) => void;
    'onUpdate:endValue': (value: string) => void;
  }
>();

type GetTimeValueParams = {
  isEffectiveTime: boolean;
  isNilTime: boolean;
  isControlledTime: boolean;
  startValue: string;
  endValue: string;
  value: string[];
};

const getTimeValue = _.cond([
  [_.matches({ isNilTime: true }), _.constant([])],
  [_.matches({ isEffectiveTime: false }), _.constant([])],
  [_.matches({ isControlledTime: false }), (value: GetTimeValueParams) => _.map(value.value, (item) => dayjs(item))],
  [_.stubTrue, ({ startValue, endValue }) => [dayjs(startValue), dayjs(endValue)]],
]);
export default DatePickerBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleRange',
    handle: (props) => {
      const type = props.get('type') ?? 'date';
      const isRange = type.includes('range');
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      const valueFormat = props.get('valueFormat') ?? type === 'date' ? 'YYYY-MM-DD' : undefined;
      return {
        range: isRange,
        [$deletePropsList]: deletePropsList,
        formTagName: 'el-form-date-picker',
        tagName: 'el-date-picker',
        valueFormat,
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handleIcon',
    handle: handleIcon,
  })
  .addPlugin({
    name: 'handleRangeDateValue',
    handle: (props) => {
      const isRange = props.get('range');
      const startValue = props.get('startValue') as string;
      const endValue = props.get('endValue') as string;
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
        'onUpdate:modelValue': _.wrap(setValue, (fn, time: any) => {
          _.attempt(fn, time);
          _.attempt(onChange, time);
        }),
      };
      return isRange ? rangeResult : {};
    },
  })
  .addPlugin({
    name: 'handleDateValue',
    handle(props) {
      const isRange = props.get('range');
      const [value, setValue] = useControllableValue(props);
      const result = {
        modelValue: value,
        'onUpdate:modelValue': _.wrap(setValue, (fn, time: Date | Array<Date> | null) => {
          _.attempt(fn, time);
        }),
      };
      return isRange ? {} : result;
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
        const { format = 'YYYY-MM-DD', modelValue } = insProps;
        const values = _.compact(_.castArray(modelValue));
        const previewText = inIDE || _.isEmpty(values) ? '-' : _.map(values, (v) => getFormatDateOrTime(v, format)).join(' ~ ');
        return <ElText text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
        preview: isPreview,
      };
    },
  })
  .addPlugin({
    name: 'handleMinDate',
    handle(props) {
      const minDate = props.get('minDate') || '1970-01-01';
      const maxDate = props.get('maxDate') || '2999-12-31';
      return {
        disabledDate: (date) => dayjs(date).isBefore(dayjs(minDate)) || dayjs(date).isAfter(dayjs(maxDate)),
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      useSyncState(props, 'disabled');
      useSyncState(props, 'preview');
      useSyncState(props, 'readonly');
      return {};
    },
  });
