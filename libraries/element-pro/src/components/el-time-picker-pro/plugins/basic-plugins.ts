import { TimePickerValue, TimeRangePicker, TimeRangeValue } from '@element-pro';
import { type NaslComponentPluginOptions, $render, useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { unref } from '@vue/composition-api';
import dayjs from 'dayjs';
import { isFunction } from 'lodash';

const DEFAULT_FORMAT = 'HH:mm:ss';

function getFormatTimeValue(v: string, format: string = DEFAULT_FORMAT) {
  if (!v) {
    return null;
  }

  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).format(format);
}

function minTime(time1: string, time2: string) {
  const arr1 = time1.split(':').map((n) => Number(n));
  const arr2 = time2.split(':').map((n) => Number(n));

  const index = arr1.find((n, i) => n || 0) < (time2[i] || 0));
}

function maxTime(time1: string, time2: string) {

}

function getDisableTime(minTime: string[], maxTime: string[]) {

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
      valueRef.value = v || typeof v !== 'string' ? null : v;
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
  props: ['range', 'disableTimeFn'],
  setup(props) {
    const { useComputed } = props;
    const { value, changeValue } = useTimePickerValue(props);
    const { onFocus, onBlur, onInput } = useContextEvents(props);

    const placeholderRef = useComputed<[string, string]>(['placeholder', 'placeholderRight', 'range'], (placeholder = '选择时间', placeholderRight, range) => {
      if (!range || !placeholderRight) {
        return placeholder;
      }

      return [placeholder, placeholderRight];
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
      onFocus,
      onBlur,
      onInput,
      disableTime: (h: number, m: number, s: number, context) => {
        const [disableTime, minTime = '00:00:00', maxTime = '23:59:59'] = props.get<[any, string, string]>(['disableTime', 'minTime', 'maxTime']);

        const range = props.getEnd('range') || false;

        if (isFunction(disableTime)) {
          return disableTime(h, m, s, context);
        }

        if (range) {
          const [startTime, endTime] = unref(value);
          if (context && context.partial === 'start') {
            return getDisableTime();
          } else {
            return getDisableTime();
          }
        } else {
          return getDisableTime(minTime.split(':'), maxTime.split(':'));
        }

        return {};
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
      onPick: (v: TimePickerValue | TimeRangeValue, context) => {
        const onPick = props.get('onPick');
        if (isFunction(onPick)) {
          const changeEvent = getChangeEventByValue(v, ...props.get<[boolean, string]>(['range', 'format']));
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

        return h(TimeRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};
