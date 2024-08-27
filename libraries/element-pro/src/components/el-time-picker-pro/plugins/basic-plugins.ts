import { TimePickerValue, TimeRangePicker, TimeRangeValue } from '@element-pro';
import { type NaslComponentPluginOptions, $render, useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { unref } from '@vue/composition-api';
import dayjs from 'dayjs';
import { isFunction, isNil } from 'lodash';
import { usePlaceholder } from '../../el-date-picker-pro/hooks';

const DEFAULT_FORMAT = 'HH:mm:ss';

function getFormatTimeValue(v: string, format: string = DEFAULT_FORMAT) {
  if (!v) {
    return null;
  }

  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).format(format);
}

function getNumberArr(str: string, position: 'start' | 'end') {
  const arr = str.split(':').map((n) => Number(n)).map((n) => (Number.isNaN(n) ? 0 : n));
  while (arr.length < 3) {
    if (arr.length === 0) {
      arr.push(position === 'start' ? 0 : 23);
    } else {
      arr.push(position === 'start' ? 0 : 59);
    }
  }
  return arr;
}

function excludeNumberArr(min: number, max: number, len: number) {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    if (i < min || i > max) {
      arr.push(i);
    }
  }

  return arr;
}

function getDisableTime(currentTimes: number[], minTime: number[], maxTime: number[]) {
  const [minH, minM, minS] = minTime;
  const [maxH, maxM, maxS] = maxTime;
  const [h, m] = currentTimes;
  const disabledTime: Partial<{ hour: Array<number>; minute: Array<number>; second: Array<number>; millisecond: Array<number> }> = {
    hour: excludeNumberArr(minH, maxH, 24),
  };

  if (h === minH) {
    disabledTime.minute = excludeNumberArr(minM, 59, 60);
    if (m === minM) {
      disabledTime.second = excludeNumberArr(minS, 59, 60);
    }
  } else if (h === maxH) {
    disabledTime.minute = excludeNumberArr(0, maxM, 60);
    if (m === maxM) {
      disabledTime.second = excludeNumberArr(0, maxS, 60);
    }
  }

  return disabledTime;
}

function getFormatStr(format: string = DEFAULT_FORMAT) {
  if (format.indexOf('s') !== -1) {
    return 'HH:mm:ss';
  }

  if (format.indexOf('m') !== -1) {
    return 'HH:mm';
  }

  return 'HH';
}

function getNaslTimeValue(v: TimePickerValue | TimeRangeValue, format: string = DEFAULT_FORMAT) {
  if (!v || typeof v !== 'string') {
    return null;
  }

  return dayjs(v, format).format(getFormatStr(format));
}

function getChangeEventByValue(v: TimePickerValue | TimeRangeValue, range: boolean, format: string) {
  const changeEvent = {
    value: null,
    startTime: null,
    endTime: null,
  };
  if (!range) {
    changeEvent.value = getNaslTimeValue(v, format);
  } else if (Array.isArray(v)) {
    changeEvent.startTime = getNaslTimeValue(v[0], format);
    changeEvent.endTime = getNaslTimeValue(v[1], format);
  }

  return changeEvent;
}

function useTimePickerValue(props: MapGet) {
  const valueRef = props.useRef<TimePickerValue | TimeRangeValue>(['value', 'startTime', 'endTime', 'range', 'format'], (v, startTime, endTime, range, format) => {
    if (!range) {
      return getFormatTimeValue(v, format);
    }

    return [getFormatTimeValue(startTime, format), getFormatTimeValue(endTime, format)];
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
    'range', 'inputAutoWidth', 'inputAlign',
    'placeholderRight', 'startTime', 'endTime',
    'maxTime', 'minTime',
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
      'inputAutoWidth',
      'inputAlign',
    ], (
      inputAutoWidth = false,
      inputAlign = 'left',
    ) => {
      return {
        autoWidth: inputAutoWidth,
        align: inputAlign,
      };
    });

    // 同步外部状态
    useSyncState({
      value: () => {
        if (Array.isArray(value.value)) {
          return null;
        }
        return getNaslTimeValue(value.value, props.get('format'));
      },
      startTime: () => {
        if (!Array.isArray(value.value)) {
          return null;
        }
        return getNaslTimeValue(value.value[0], props.get('format'));
      },
      endTime: () => {
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
          const [startTime, endTime] = unref(value);
          const startTimes = endTime ? getNumberArr(getNaslTimeValue(startTime), 'start') : null;
          const endTimes = endTime ? getNumberArr(getNaslTimeValue(endTime), 'end') : null;
          if (context && context.partial === 'start') {
            return getDisableTime(currentTimes, minTimes, endTimes || maxTimes);
          }

          return getDisableTime(currentTimes, startTimes || minTimes, maxTimes);
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
        ] = props.get<Array<(val: string) => void>>(['update:value', 'update:startTime', 'update:endTime']);
        const changeEvent = getChangeEventByValue(v, range, format);

        if (range) {
          onUpdateStartTime(changeEvent.startTime);
          onUpdateEndTime(changeEvent.endTime);
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
        context.propsData.props.rangeInputProps.inputProps = inputProps.value;

        return h(TimeRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};
