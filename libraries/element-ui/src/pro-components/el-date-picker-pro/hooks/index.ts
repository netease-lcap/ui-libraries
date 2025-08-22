import { DateRangeValue, DateValue, DateMultipleValue, PickContext } from '@element-pro';
import { useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { ComputedRef, Ref, unref } from '@vue/composition-api';
import dayjs, { Dayjs } from 'dayjs';
import ZH_CN from 'dayjs/locale/zh-cn';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { isFunction, isNil } from 'lodash';
import { CreateElement } from 'vue';
import customParseFormat from '../../../utils/date-parse';
import { parseToDayjs } from '../../../../design/_common/js/date-picker/format';

(ZH_CN as any).meridiem = (hour: number) => {
  if (hour < 6) {
    return '凌晨';
  }

  if (hour < 9) {
    return '早上';
  }

  if (hour < 12) {
    return '上午';
  }

  if (hour < 13) {
    return '中午';
  }

  if (hour < 18) {
    return '下午';
  }

  return '晚上';
};
dayjs.locale('zh-cn', ZH_CN);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
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

function transformMultipleDate(date: DateValue | DateMultipleValue) {
  if (!date) {
    return [];
  }

  if (!Array.isArray(date)) {
    return [transformDate(date)];
  }

  return date.map(transformDate).filter(Boolean);
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

function getNaslMultipleDateValue(d: DateValue | DateMultipleValue | null, format: any) {
  if (!d) {
    return [];
  }

  if (!Array.isArray(d)) {
    return [getNaslDateValue(d, format)].filter(Boolean);
  }

  return d.map((val) => getNaslDateValue(val, format)).filter(Boolean);
}

function getFormat(mode: string = 'date', format: string, enableTimePicker: boolean = false) {
  if (format) {
    return format;
  }

  if (mode === 'year') {
    return 'YYYY';
  }

  if (mode === 'month') {
    return 'YYYY-MM';
  }

  if (mode === 'quarter') {
    return 'YYYY-[Q]Q';
  }

  if (mode === 'week') {
    return 'YYYY-wo';
  }

  if (mode === 'date') {
    return `YYYY-MM-DD${enableTimePicker ? ' HH:mm:ss' : ''}`;
  }

  return '';
}

function dateValue2Dayjs(d: DateValue | null, format: string) {
  if (!d) {
    return null;
  }

  return parseToDayjs(d, format);
}

function dayjs2Date(d: Dayjs | null) {
  if (!d || !d.isValid()) {
    return null;
  }

  return d.toDate();
}

function normalizeDateRange(s: any, e: any) {
  if (isNil(s) && isNil(e)) {
    return [];
  }

  return [s, e];
}

export const useDatePickerValue = (props: MapGet, valueFormat: ComputedRef<string> | Ref<string>) => {
  const valueRef = props.useRef<DateValue | DateRangeValue | DateMultipleValue | null>(
    ['value', 'startValue', 'endValue', 'range', 'multiple'],
    (v, startValue, endValue, range, multiple) => {
      if (!range) {
        if (multiple) {
          return transformMultipleDate(v);
        }

        return transformDate(v);
      }

      if (v && !startValue && !endValue) {
        const values = (Array.isArray(v) ? v : [v]);
        return normalizeDateRange(transformDate(values[0]), transformDate(values[1]));
      }

      return normalizeDateRange(transformDate(startValue), transformDate(endValue));
    },
  );

  function changeValue(d: Dayjs | Dayjs[], v: DateValue | DateRangeValue | DateMultipleValue) {
    const range = props.get<boolean>('range');
    const multiple = props.get<boolean>('multiple');
    const [
      onUpdateValue = () => {},
      onUpdateStartValue = () => {},
      onUpdateEndValue = () => {},
    ] = props.get<Array<(val: any) => void>>([
      'update:value',
      'update:startValue',
      'update:endValue',
    ]);

    const format = getFormat(props.get<string>('mode'), props.get<string>('format'), props.get<boolean>('enableTimePicker'));
    let updateValue: any = null;
    if (multiple) {
      const vals = (Array.isArray(v) ? v : [v]).map((val) => dateValue2Dayjs(val, format)).filter(Boolean).map((d: any) => d.toDate());
      valueRef.value = vals;
      updateValue = getNaslMultipleDateValue(vals, valueFormat);;
    } else if (!range) {
      const val = v && d ? dayjs2Date(Array.isArray(d) ? d[0] : d) : null;
      valueRef.value = val;
      updateValue = getNaslDateValue(val, valueFormat);
    } else {
      valueRef.value = Array.isArray(d) ? normalizeDateRange(dayjs2Date(d[0]), dayjs2Date(d[1])) : [];
      const startValue = getNaslDateValue(d[0], valueFormat);
      const endValue = getNaslDateValue(d[1], valueFormat);
      onUpdateStartValue(startValue);
      onUpdateEndValue(endValue);
      updateValue = normalizeDateRange(startValue, endValue);
    }

    onUpdateValue(updateValue);
    return updateValue;
  }

  useSyncState({
    value: () => {
      const multiple = props.get<boolean>('multiple');
      if (multiple) {
        return getNaslMultipleDateValue(valueRef.value, valueFormat);
      }

      if (Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value, valueFormat);
    },
    startValue: () => {
      if (!Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value[0], valueFormat);
    },
    endValue: () => {
      if (!Array.isArray(valueRef.value)) {
        return null;
      }
      return getNaslDateValue(valueRef.value[1], valueFormat);
    },
  });

  return {
    value: valueRef,
    changeValue,
  };
};

export function getChangeEventByValue(d: DateValue | DateRangeValue | DateMultipleValue, range: boolean, valueFormat: ComputedRef<string> | Ref<string>, multiple: boolean = false) {
  const changeEvent: any = {
    value: null,
    startValue: null,
    endValue: null,
  };

  if (multiple) {
    changeEvent.value = getNaslMultipleDateValue(d, valueFormat);
  } else if (!range) {
    changeEvent.value = d ? getNaslDateValue(!Array.isArray(d) ? d : d[0], valueFormat) : null;
  } else if (Array.isArray(d)) {
    changeEvent.startValue = getNaslDateValue(d[0], valueFormat);
    changeEvent.endValue = getNaslDateValue(d[1], valueFormat);
    changeEvent.value = normalizeDateRange(changeEvent.startValue, changeEvent.endValue);
  }

  return changeEvent;
}

export function useContextEvents(props: MapGet, valueFormat: ComputedRef<string> | Ref<string>) {
  const events: Record<string, any> = {};

  ['onFocus', 'onBlur', 'onInput'].forEach((eventName) => {
    events[eventName] = (context) => {
      const handler = props.get(eventName);
      if (isFunction(handler)) {
        const changeEvent = getChangeEventByValue(context.value, props.get<boolean>('range'), valueFormat, props.get<boolean>('multiple'));
        handler({
          ...changeEvent,
          position: context && context.partial,
        });
      }
    };
  });

  events.onPick = (value: DateValue | DateMultipleValue, context: PickContext) => {
    const handler = props.get('onPick');
    if (isFunction(handler)) {
      const changeEvent = getChangeEventByValue(value, false, valueFormat, props.get<boolean>('multiple'));
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
    return (date: DateValue, unit: any = 'date') => {
      let disabled = false;
      if (minDate) {
        disabled = dayjs(date).isBefore(dayjs(minDate, format), unit);
      }

      if (!disabled && maxDate) {
        disabled = dayjs(date).isAfter(dayjs(maxDate, format), unit);
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
