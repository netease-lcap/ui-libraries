import { CreateElement } from 'vue';
import { TimePickerValue, TimeRangePicker, TimeRangeValue } from '@element-pro';
import { type NaslComponentPluginOptions, $render, useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { unref } from '@vue/composition-api';
import { isFunction, isNil } from 'lodash';
import {
  getFormatTimeValue,
  getNumberArr,
  getDisableTime,
  getChangeEventByValue,
  getNaslTimeValue,
} from '../utils';
import { usePlaceholder } from '../../el-date-picker-pro/hooks';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

function useTimePickerValue(props: MapGet) {
  const valueRef = props.useRef<TimePickerValue | TimeRangeValue>(['value', 'startValue', 'endValue', 'range', 'format'], (v, startValue, endValue, range, format) => {
    if (!range) {
      return getFormatTimeValue(v, format);
    }

    return [getFormatTimeValue(startValue, format), getFormatTimeValue(endValue, format)];
  });

  function changeValue(v: TimePickerValue | TimeRangeValue) {
    const [range] = props.get<[boolean]>(['range']);
    if (!range) {
      valueRef.value = !v || typeof v !== 'string' ? null : v;
    } else {
      valueRef.value = Array.isArray(v) ? v : [null, null];
    }
  }
  return {
    value: valueRef,
    changeValue,
  };
}

function useContextEvents(props: MapGet) {
  const events: Record<string, any> = {};

  ['onFocus', 'onBlur', 'onInput'].forEach((eventName) => {
    events[eventName] = (context) => {
      const handler = props.get(eventName);
      if (isFunction(handler)) {
        const changeEvent = getChangeEventByValue(context.value, ...props.get<[boolean, string]>(['range', 'format']));
        handler({
          ...changeEvent,
          position: context.position,
        });
      }
    };
  });

  return events;
}

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [
    'range', 'autoWidth', 'align',
    'placeholderRight', 'startValue', 'endValue',
    'maxTime', 'minTime', 'prefixIcon', 'suffixIcon',
  ],
  setup(props) {
    const { useComputed } = props;
    const { value, changeValue } = useTimePickerValue(props);
    const { onFocus, onBlur, onInput } = useContextEvents(props);

    const placeholderRef = usePlaceholder(props, '请选择时间');

    const hideDisabledTime = useComputed<boolean>('hideDisabledTime', (v) => {
      if (isNil(v)) {
        return false;
      }

      return !!v;
    });

    const inputProps = useComputed<any>([
      'autoWidth',
      'align',
      'prefixIcon',
      'suffixIcon',
    ], (
      autoWidth = false,
      align = 'left',
      prefixIcon,
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

    // 同步外部状态
    useSyncState({
      value: () => {
        if (Array.isArray(value.value)) {
          return null;
        }
        return getNaslTimeValue(value.value, props.get('format'));
      },
      startValue: () => {
        if (!Array.isArray(value.value)) {
          return null;
        }
        return getNaslTimeValue(value.value[0], props.get('format'));
      },
      endValue: () => {
        if (!Array.isArray(value.value)) {
          return null;
        }
        return getNaslTimeValue(value.value[1], props.get('format'));
      },
    });

    return {
      value,
      placeholder: placeholderRef,
      hideDisabledTime,
      inputProps,
      onFocus,
      onBlur,
      onInput,
      disableTime: (...args) => {
        const [h, m, s, ms] = args;
        let context = ms;
        if (typeof context !== 'object') {
          // eslint-disable-next-line prefer-destructuring
          context = args[4];
        }
        const [disableTime, minTime = '00:00:00', maxTime = '23:59:59'] = props.get<[any, string, string]>(['disableTime', 'minTime', 'maxTime']);

        if (isFunction(disableTime)) {
          return disableTime(h, m, s, context);
        }

        const range = props.getEnd('range') || false;
        const minTimes = getNumberArr(minTime, 'start');
        const maxTimes = getNumberArr(maxTime, 'end');
        const currentTimes = [h, m, s];

        if (range) {
          const [startValue, endValue] = unref(value);
          const startValues = endValue ? getNumberArr(getNaslTimeValue(startValue), 'start') : null;
          const endValues = endValue ? getNumberArr(getNaslTimeValue(endValue), 'end') : null;
          if (context && context.partial === 'start') {
            return getDisableTime(currentTimes, minTimes, endValues || maxTimes);
          }

          return getDisableTime(currentTimes, startValues || minTimes, maxTimes);
        }

        return getDisableTime(currentTimes, minTimes, maxTimes);
      },
      onChange: (v: TimePickerValue | TimeRangeValue) => {
        changeValue(v);
        const onChange = props.get('onChange');
        const [range, format] = props.get<[boolean, string]>(['range', 'format']);
        const [
          onUpdateValue = () => {},
          onUpdateStartTime = () => {},
          onUpdateEndTime = () => {},
        ] = props.get<Array<(val: string) => void>>(['update:value', 'update:startValue', 'update:endValue']);
        const changeEvent = getChangeEventByValue(v, range, format);

        if (range) {
          onUpdateStartTime(changeEvent.startValue);
          onUpdateEndTime(changeEvent.endValue);
        } else {
          onUpdateValue(changeEvent.value);
        }

        if (isFunction(onChange)) {
          onChange(changeEvent);
        }
      },
      onPick: (v: TimePickerValue, context) => {
        const onPick = props.get('onPick');
        if (isFunction(onPick)) {
          const changeEvent = getChangeEventByValue(v, false, props.get('format'));
          onPick({
            ...changeEvent,
            position: context && context.position,
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

        return h(TimeRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};
