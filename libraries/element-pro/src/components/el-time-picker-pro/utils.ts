import { TimePickerValue, TimeRangeValue } from '@element-pro';
import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'HH:mm:ss';

export function getFormatTimeValue(v: string, format: string = DEFAULT_FORMAT) {
  if (!v) {
    return null;
  }

  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).format(format);
}

export function getNumberArr(str: string, position: 'start' | 'end') {
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

export function excludeNumberArr(min: number, max: number, len: number) {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    if (i < min || i > max) {
      arr.push(i);
    }
  }

  return arr;
}

export function getDisableTime(currentTimes: number[], minTime: number[], maxTime: number[]) {
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

export function getFormatStr(format: string = DEFAULT_FORMAT) {
  if (format.indexOf('s') !== -1) {
    return 'HH:mm:ss';
  }

  if (format.indexOf('m') !== -1) {
    return 'HH:mm';
  }

  return 'HH';
}

export function getNaslTimeValue(v: TimePickerValue | TimeRangeValue, format: string = DEFAULT_FORMAT) {
  if (!v || typeof v !== 'string') {
    return null;
  }

  return dayjs(v, format).format(getFormatStr(format));
}

export function getChangeEventByValue(v: TimePickerValue | TimeRangeValue, range: boolean, format: string) {
  const changeEvent = {
    value: null,
    startValue: null,
    endValue: null,
  };
  if (!range) {
    changeEvent.value = getNaslTimeValue(v, format);
  } else if (Array.isArray(v)) {
    changeEvent.startValue = getNaslTimeValue(v[0], format);
    changeEvent.endValue = getNaslTimeValue(v[1], format);
  }

  return changeEvent;
}
