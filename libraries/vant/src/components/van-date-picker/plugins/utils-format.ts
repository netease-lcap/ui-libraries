import dayjs from 'dayjs';
import _ from 'lodash';

type DateValue = string | number | Date | null;

/**
 * 判断字符串是否为有效时间
 * @param v 时间字符串
 * @returns 是否为有效时间
 */
export function isValidStringTime(v: DateValue) {
  if (!v) {
    return false;
  }
  return dayjs(v).isValid();
}

/**
 * 将字符串转换为数组
 * @param value
 * @returns
 */
function toDateValues(value: DateValue | Array<string>) {
  if (Array.isArray(value)) {
    return value;
  }
  if (isValidStringTime(value)) {
    return dayjs(value).format('YYYY/MM/DD').split('/');
  }
  return [];
}

/**
 * 将字符串转换为数组
 * @param value
 * @returns
 */
function toTimeValues(value: DateValue | Array<string>) {
  if (Array.isArray(value)) {
    return value;
  }
  if (isValidStringTime(value)) {
    return dayjs(value).format('HH:mm:ss').split(':');
  }
  return [];
}

/**
 * 将数组转换为字符串
 * @param values
 * @returns
 */
export function toTimeValue(values: Array<string>) {
  return values.length > 0 ? values.join(':') : null;
}

/**
 * 将数组转换为字符串
 * @param values
 * @returns
 */
export function toDateValue(values: Array<string>) {
  return values.length > 0 ? values.join('/') : null;
}

/**
 * 获取转换器
 * @param converter
 * @returns
 */
function getConverter(converter?: string) {
  const formaters = [
    'YYYY/MM/DD HH:mm:ss',
    'YYYY/MM/DD HH:mm',
    'YYYY/MM/DD HH',
    'YYYY/MM/DD',
    'YYYY/MM',
    'YYYY',
    'json',
    'timestamp',
    'date',
  ];
  if (converter && formaters.includes(converter)) {
    return converter;
  }
  return formaters[0];
}

/**
 * 将日期和时间转换为设置的格式
 * @param dateValues
 * @param timeValues
 * @param converter
 * @returns
 */
export function toValue(dateValues: Array<string>, timeValues: Array<string>, converter?: string) {
  const dateValue = toDateValue(dateValues);
  const timeValue = toTimeValue(timeValues);
  let value = `${dateValue} ${timeValue ? ` ${timeValue}` : ''}`;
  if (!isValidStringTime(value)) {
    return null;
  }
  value = dayjs(value).format('YYYY/MM/DD HH:mm:ss');
  const finalConverter = getConverter(converter);
  if (finalConverter === 'json') {
    return new Date(value).toJSON();
  }
  if (finalConverter === 'timestamp') {
    return +new Date(value);
  }
  if (finalConverter === 'date') {
    return new Date(value);
  }
  return dayjs(value).format(finalConverter);
}

/**
 * 获取当前值，转换成数组，并补全为 unitIndex 长度
 * @param value
 * @param unitIndex
 * @returns
 */
export function getCurrentValue(value: string | Array<string>, unitIndex: number) {
  const values = toDateValues(value || []);
  if (values.length === 0) {
    return values;
  }
  for (let i = 0; i <= unitIndex; i++) {
    if (!values[i]) {
      values[i] = '01';
    }
  }
  return values.slice(0, unitIndex + 1);
}

/**
 * 获取当前时间值，需将时间转换成数组，并补全为 unitIndex 长度
 * @param value
 * @param unitIndex
 * @returns
 */
export function getCurrentTimeValue(value: string | Array<string>, unitIndex: number) {
  const values = toTimeValues(value || []);
  if (values.length === 0) {
    return values;
  }
  for (let i = 0; i <= unitIndex; i++) {
    if (!values[i]) {
      values[i] = '00';
    }
  }
  return values.slice(0, unitIndex + 1);
}

/**
 * 获取显示格式
 * @param unit
 * @param format
 * @returns
 */
function getDisplayFormatter(unit: string, format: string) {
  const map = {
    day: ['YYYY-MM-DD', 'M/D/YYYY', 'D/M/YYYY', 'YYYY年M月D日'],
    month: ['YYYY-MM', 'M/YYYY', 'YYYY年M月'],
    year: ['YYYY', 'YYYY年'],
    hour: ['YYYY-MM-DD HH', 'YYYY年M月D日 HH时'],
    minute: ['YYYY-MM-DD HH:mm', 'YYYY年M月D日 HH时mm分'],
    second: ['YYYY-MM-DD HH:mm:ss', 'YYYY年M月D日 HH时mm分ss秒'],
  };
  const formatters = map[unit];
  if (format && formatters?.includes(format)) {
    return format;
  }
  return formatters?.[0] || 'YYYY-MM-DD';
}

/**
 * 获取格式化值
 * @param values
 * @param unit
 * @param format
 * @returns
 */
export function getFormatValue(values: Array<Array<Array<string>>>, options: any) {
  const { unit, showFormatter, advancedFormatEnable, advancedFormatValue } = options;
  const isEmpty = values.every((value) => value.length === 0);
  if (isEmpty) {
    return '';
  }
  const finalFormat =
    advancedFormatEnable && advancedFormatValue ? advancedFormatValue : getDisplayFormatter(unit, showFormatter);
  return values
    .map((value) => {
      const dateValueStr = value[0].join('/');
      const timeValueStr = value[1]?.join(':');
      const dateValue = `${dateValueStr} ${timeValueStr}`;
      if (!isValidStringTime(dateValue)) {
        return '';
      }
      return dayjs(dateValue).format(finalFormat);
    })
    .join(' - ');
}

/**
 * 获取最大和最小日期，并转换为 Date 对象
 * @param maxDate
 * @param minDate
 * @returns
 */
export function getMaxMinDates(maxDate: DateValue, minDate: DateValue) {
  let maxDateValue;
  let minDateValue;
  if (isValidStringTime(maxDate)) {
    maxDateValue = new Date(dayjs(maxDate).format('YYYY/MM/DD HH:mm:ss'));
  }
  if (isValidStringTime(minDate)) {
    minDateValue = new Date(dayjs(minDate).format('YYYY/MM/DD HH:mm:ss'));
  }
  return { maxDateValue, minDateValue };
}

/**
 * 获取时间边界
 * 当日期选择后，时间边界会变化，需要根据日期来获取时间边界
 * @param currentDate
 * @param maxDate
 * @param minDate
 * @returns
 */
export function getTimeBoundary(currentDate: Array<string>, maxDate: DateValue, minDate: DateValue) {
  const currentDateValue = toDateValue(currentDate);
  const current = dayjs(currentDateValue);
  const result: { maxTime?: any; minTime?: any } = {
    maxTime: '23:59:59',
    minTime: '00:00:00',
  };

  // 与最大日期同一天时，设置最大时间
  if (isValidStringTime(maxDate)) {
    const max = dayjs(maxDate);
    if (current.isValid()) {
      if (current.isSame(max, 'day')) {
        result.maxTime = max.format('HH:mm:ss');
      }
    } else {
      result.maxTime = max.format('HH:mm:ss');
    }
  }

  // 与最小日期同一天时，设置最小时间
  if (isValidStringTime(minDate)) {
    const min = dayjs(minDate);
    if (current.isValid()) {
      if (current.isSame(min, 'day')) {
        result.minTime = min.format('HH:mm:ss');
      }
    } else {
      result.minTime = min.format('HH:mm:ss');
    }
  }
  return result;
}

/**
 * 获取范围最大日期
 * 当结束日期选择后，开始日期最大日期会变化，需要根据结束日期来获取最大日期
 * @param currentDate
 * @param currentTime
 * @param maxDate
 * @returns
 */
export function getRangeMaxDate(currentDate: Array<string>, currentTime: Array<string>, maxDate: DateValue) {
  const currentValue = toValue(currentDate, currentTime, 'date');
  const current = dayjs(currentValue);
  if (current.isValid()) {
    return current.isBefore(maxDate) ? currentValue : maxDate;
  }
  return maxDate;
}

/**
 * 获取范围最小日期
 * 当开始日期选择后，结束日期最小日期会变化，需要根据开始日期来获取最小日期
 * @param currentDate 组件选择后都是数组形式
 * @param currentTime 组件选择后都是数组形式
 * @param minDate 最小日期
 * @returns
 */
export function getRangeMinDate(currentDate: Array<string>, currentTime: Array<string>, minDate: DateValue) {
  const currentValue = toValue(currentDate, currentTime, 'date');
  const current = dayjs(currentValue);
  if (current.isValid()) {
    return current.isAfter(minDate) ? currentValue : minDate;
  }
  return minDate;
}

export function getValidUnit(unit: string, type: string) {
  const vaildMap = {
    date: ['day', 'month', 'year'],
    datetime: ['second', 'minute', 'hour'],
  };
  if (vaildMap[type]?.includes(unit)) {
    return unit;
  }
  return vaildMap[type]?.[0] || 'day';
}
