import { DateRangeValue, DateValue, PickContext } from '@element-pro';
import { useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { ComputedRef, Ref, unref } from '@vue/composition-api';
import dayjs, { Dayjs } from 'dayjs';
import { isFunction } from 'lodash';
import { CreateElement } from 'vue';

export const usePlaceholder = (props: MapGet, defaultPlaceholder: string) => {
  const { useComputed } = props;
  const placeholderRef = useComputed<string | [string, string]>(
    ['placeholder', 'placeholderRight', 'range'],
    (placeholder = defaultPlaceholder, placeholderRight, range) => {
      if (!range || !placeholderRight) {
        return placeholder;
      }

      return [placeholder, placeholderRight];
    },
  );

  return placeholderRef;
};

function transformDate(date) {
  if (!date) {
    return undefined;
  }
  if (typeof date === 'string') {
    /**
     * 因为如果时间格式是 json 的字符串 "2021-06-18T07:55:26.914Z"
     * 不能做 - 的替换，会导致转化失效
     */
    if (date.includes('Q')) {
      return new Date(
        date
          .replace(/Q1/, '1')
          .replace(/Q2/, '4')
          .replace(/Q3/, '7')
          .replace(/Q4/, '10'),
      );
    }
    if (date.includes('W')) {
      return dayjs(date, [
        'YYYY-WWWW',
        'YYYY-WWWW H:mm:ss',
        'YYYY-WWWW HH:mm:ss',
      ]).toDate();
    }
    if (!date.includes('T')) {
      date = date.replace(/-/g, '/');
    }
    return new Date(date);
  }

  if (typeof date === 'number') {
    return new Date(date);
  }

  if (typeof date === 'object') {
    return date;
  }

  return undefined;
}

function getNaslDateValue(d: DateValue | null, format: any) {
  if (!d) {
    return null;
  }

  const date = dayjs(d);
  if (!date.isValid()) {
    return null;
  }

  const valueFormat = unref(format) || 'json';

  switch (valueFormat) {
    case 'json':
      return date.toDate().toJSON();
    case 'timestamp':
      return date.toDate().getTime();
    case 'date':
      return date.toDate();
    default:
      return date.format(valueFormat);
  }
}

function dayjs2Date(d: Dayjs | null) {
  if (!d || !d.isValid()) {
    return null;
  }

  return d.toDate();
}

export const useDatePickerValue = (props: MapGet, format: ComputedRef<string> | Ref<string>) => {
  const valueRef = props.useRef<DateValue | DateRangeValue>(
    ['value', 'startValue', 'endValue', 'range'],
    (v, startValue, endValue, range) => {
      if (!range) {
        return transformDate(v);
      }

      return [transformDate(startValue), transformDate(endValue)];
    },
  );

  function changeValue(d: Dayjs | Dayjs[], v: DateValue | DateRangeValue) {
    const range = props.get<boolean>('range');
    const [
      onUpdateValue = () => {},
      onUpdateStartValue = () => {},
      onUpdateEndValue = () => {},
    ] = props.get<Array<(val: any) => void>>([
      'update:value',
      'update:startValue',
      'update:endValue',
    ]);

    if (!range) {
      valueRef.value = d ? dayjs2Date(Array.isArray(d) ? d[0] : d) : null;
      onUpdateValue(getNaslDateValue(Array.isArray(v) ? v[0] : v, format));
    } else {
      valueRef.value = Array.isArray(d) ? [dayjs2Date(d[0]), dayjs2Date(d[1])] : [null, null];
      onUpdateStartValue(getNaslDateValue(d[0], format));
      onUpdateEndValue(getNaslDateValue(d[1], format));
    }
  }

  useSyncState({
    value: () => {
      if (Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value, format);
    },
    startValue: () => {
      if (!Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value[0], format);
    },
    endValue: () => {
      if (!Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value[1], format);
    },
  });

  return {
    value: valueRef,
    changeValue,
  };
};

export function getChangeEventByValue(d: DateValue | DateRangeValue, range: boolean, format: ComputedRef<string> | Ref<string>) {
  const changeEvent = {
    value: null,
    startValue: null,
    endValue: null,
  };
  if (!range) {
    changeEvent.value = d ? getNaslDateValue(!Array.isArray(d) ? d : d[0], format) : null;
  } else if (Array.isArray(d)) {
    changeEvent.startValue = getNaslDateValue(d[0], format);
    changeEvent.endValue = getNaslDateValue(d[1], format);
  }

  return changeEvent;
}

export function useContextEvents(props: MapGet, format: ComputedRef<string> | Ref<string>) {
  const events: Record<string, any> = {};

  ['onFocus', 'onBlur', 'onInput'].forEach((eventName) => {
    events[eventName] = (context) => {
      const handler = props.get(eventName);
      if (isFunction(handler)) {
        const changeEvent = getChangeEventByValue(context.value, props.get<boolean>('range'), format);
        handler({
          ...changeEvent,
          position: context && context.partial,
        });
      }
    };
  });

  events.onPick = (value: DateValue, context: PickContext) => {
    const handler = props.get('onPick');
    if (isFunction(handler)) {
      const changeEvent = getChangeEventByValue(value, false, format);
      handler({
        ...changeEvent,
        position: context && context.partial,
      });
    }
  };

  return events;
}

export function useDisableDate(props: MapGet, format: string) {
  const disableDate = props.useComputed<any>(['minDate', 'maxDate'], (minDate, maxDate) => {
    return (date: DateValue) => {
      let disabled = false;
      if (minDate) {
        disabled = dayjs(date).isBefore(dayjs(minDate, format), 'date');
      }

      if (!disabled && maxDate) {
        disabled = dayjs(date).isAfter(dayjs(maxDate, format), 'date');
      }

      return disabled;
    };
  });

  return disableDate;
}

function dayjsEndTime(d: Dayjs) {
  return d.endOf('day').toDate();
}

function dayjsStartTime(d: Dayjs) {
  return d.startOf('day').toDate();
}

export function usePresets(props: MapGet) {
  const presets = props.useComputed(['enablePresets', 'range', 'mode'], (enablePresets = false, range = false, mode = 'date') => {
    if (!enablePresets || mode !== 'date') {
      return undefined;
    }

    if (range) {
      return {
        最近一周: [dayjsStartTime(dayjs().subtract(6, 'day')), dayjsEndTime(dayjs())],
        最近一个月: [dayjsStartTime(dayjs().subtract(1, 'day').subtract(1, 'month')), dayjsEndTime(dayjs())],
        最近三个月: [dayjsStartTime(dayjs().subtract(1, 'day').subtract(3, 'month')), dayjsEndTime(dayjs())],
      };
    }

    return {
      今天: dayjsStartTime(dayjs()),
      昨天: dayjsStartTime(dayjs().subtract(1, 'day')),
      一周前: dayjsStartTime(dayjs().subtract(7, 'day')),
    };
  });

  return presets;
}

export function useInputProps(props: MapGet) {
  const inputProps = props.useComputed<any>([
    'autoWidth',
    'align',
  ], (
    autoWidth = false,
    align = 'left',
  ) => {
    return {
      autoWidth,
      align,
    };
  });

  return inputProps;
}

export function useIcons(props: MapGet) {
  const prefixIcon = props.useComputed('prefixIcon', (icon: string) => {
    if (!icon) {
      return undefined;
    }

    return (h: CreateElement) => {
      return h('el-icon', { attrs: { name: icon } });
    };
  });
  const suffixIcon = props.useComputed('suffixIcon', (icon: string) => {
    if (!icon) {
      return undefined;
    }

    return (h: CreateElement) => {
      return h('el-icon', { attrs: { name: icon } });
    };
  });

  return {
    prefixIcon,
    suffixIcon,
  };
}
