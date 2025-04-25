import { CreateElement } from 'vue';
import { NaslComponentPluginOptions, $render } from '@lcap/vue2-utils';
import {
  DateRangeValue,
  DateRangePicker,
  DateValue,
  ElDatePickerProps,
  ElDateRangePickerProps,
  DateRangePickerPartial,
} from '@element-pro';
import dayjs, { Dayjs } from 'dayjs';
import { isFunction } from 'lodash';

import {
  usePlaceholder,
  useDatePickerValue,
  useContextEvents,
  useDisableDate,
  getChangeEventByValue,
  usePresets,
} from '../../el-date-picker-pro/hooks';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

function isDisablesTime(d: Dayjs, maxDate: string, minDate: string) {
  let disabled = false;

  if (minDate && d.isBefore(minDate, 'seconds')) {
    disabled = true;
  }

  if (!disabled && maxDate && d.isAfter(maxDate, 'second')) {
    disabled = true;
  }

  return disabled;
}

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: [
    'range', 'autoWidth', 'align',
    'placeholderRight', 'startValue', 'endValue',
    'maxTime', 'minTime', 'enablePresets', 'prefixIcon', 'suffixIcon',
  ],
  setup(props) {
    const { useComputed } = props;
    const placeholder = usePlaceholder(props, '请选择时间');
    const valueFormat = props.useComputed('converter', (v) => {
      if (!v) {
        return 'json';
      }

      if (v === 'format') {
        return DEFAULT_FORMAT;
      }

      return v;
    });
    const { value, changeValue } = useDatePickerValue(props, valueFormat);
    const events = useContextEvents(props, valueFormat);
    const disableDate = useDisableDate(props, DEFAULT_FORMAT);
    const presets = usePresets(props);

    const inputProps = props.useComputed<any>([
      'autoWidth',
      'align',
      'prefixIcon',
      'suffixIcon',
    ], (
      autoWidth = false,
      align = 'left',
      prefixIcon = 'el-icon-date',
      suffixIcon,
    ) => {
      const inputStyleProps: any = {
        autoWidth,
        align,
      };

      if (prefixIcon) {
        inputStyleProps.prefixIcon = (h: CreateElement) => h('el-icon', { attrs: { name: prefixIcon } });
      }

      if (suffixIcon) {
        inputStyleProps.suffixIcon = (h: CreateElement) => h('el-icon', { attrs: { name: suffixIcon } });
      }

      return inputStyleProps;
    });

    const format = useComputed(['format', 'dateFormat', 'timeFormat'], (
      formatStr,
      dateFormat = 'YYYY-MM-DD',
      timeFormat = 'HH:mm:ss',
    ) => {
      if (formatStr) {
        return formatStr;
      }

      return [dateFormat, timeFormat].join(' ');
    });

    const disableTime: ElDatePickerProps['disableTime'] | ElDateRangePickerProps['disableTime'] = (time: any, context?: { partial: 'start' | 'end' }) => {
      const range = props.get<boolean>('range') || false;
      const [minDate, maxDate] = props.get<[string, string]>(['minDate', 'maxDate']);

      if (!range) {
        return time && isDisablesTime(dayjs(time), maxDate, minDate);
      }

      if (context && context.partial === 'start') {
        return time[0] && (
          isDisablesTime(dayjs(time[0]), maxDate, minDate)
          || (time[1] && dayjs(time[0]).isAfter(time[1]))
        );
      }

      return time[1] && (
        isDisablesTime(dayjs(time[1]), maxDate, minDate)
        || (time[0] && dayjs(time[1]).isBefore(time[0]))
      );
    };

    return {
      value,
      placeholder,
      inputProps,
      disableDate,
      presets,
      format,
      ...events,
      valueType: DEFAULT_FORMAT,
      enableTimePicker: true,
      disableTime,
      timePickerProps: {
        hideDisabledTime: false,
      },
      onChange: (v: DateValue | DateRangeValue, context) => {
        const [range] = props.get<[boolean]>(['range']);
        const onChange = props.get<any>('onChange') || (() => {});
        const changeEvent = getChangeEventByValue(v, range, valueFormat);
        changeValue(context.dayjsValue, v);
        onChange({
          ...changeEvent,
          trigger: context.trigger,
        });
      },
      onConfirm: (context: { date: Date | Date[], partial: DateRangePickerPartial }) => {
        const [range, onConfirm] = props.get<[boolean, any]>(['range', 'onConfirm']);

        if (isFunction(onConfirm)) {
          const event = getChangeEventByValue(context.date, range, valueFormat);
          onConfirm({
            ...event,
            position: context.partial,
          });
        }
      },
      [$render]: (resultVNode, h, context) => {
        const range = props.getEnd('range') || false;

        if (!range) {
          return resultVNode;
        }

        delete context.propsData.props.inputProps;
        if (!context.propsData.props.rangeInputProps) {
          context.propsData.props.rangeInputProps = {};
        }
        const { prefixIcon, suffixIcon, ...reset } = inputProps.value;
        context.propsData.props.rangeInputProps.inputProps = reset;
        context.propsData.props.rangeInputProps.prefixIcon = prefixIcon;
        context.propsData.props.rangeInputProps.suffixIcon = suffixIcon;

        return h(DateRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};
