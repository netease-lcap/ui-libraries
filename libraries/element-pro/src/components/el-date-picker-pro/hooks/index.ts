import { DateRangeValue, DateValue } from '@element-pro';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import dayjs, { Dayjs } from 'dayjs';

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
    date = date.replace(/-/g, '/');
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

function getNaslDateValue(d: Dayjs | null, format = 'YYYY-MM-DD') {
  if (!d || !d.isValid()) {
    return null;
  }

  return d.format(format);
}

export const useDatePickerValue = (props: MapGet) => {
  const valueRef = props.useRef<DateValue | DateRangeValue>(
    ['value', 'startDate', 'endDate', 'range'],
    (v, startDate, endDate, range) => {
      if (!range) {
        return transformDate(v);
      }

      return [transformDate(startDate), transformDate(endDate)];
    },
  );

  function changeValue(d: Dayjs | Dayjs[]) {
    const range = props.get<boolean>('range');
    if (!range) {
      valueRef.value = d ? d : null;
    } else {
      valueRef.value = Array.isArray(d) ? [getNaslDateValue(d[0]), getNaslDateValue(d[1])] : [null, null];
    }
  }
  return {
    value: valueRef,
    changeValue,
  };
};

export function getChangeEventByValue(d: Dayjs | Dayjs[], range: boolean, format: string) {
  const changeEvent = {
    value: null,
    startDate: null,
    endDate: null,
  };
  if (!range) {
    changeEvent.value = d ? getNaslDateValue(!Array.isArray(d) ? d : d[0], format) : null;
  } else if (Array.isArray(d)) {
    changeEvent.startDate = getNaslDateValue(d[0], format);
    changeEvent.endDate = getNaslDateValue(d[1], format);
  }

  return changeEvent;
}
