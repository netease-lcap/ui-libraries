import dayjs from 'dayjs';
import _ from 'lodash';

/**
 * 判断字符串是否为有效时间
 * @param v 时间字符串
 * @returns 是否为有效时间
 */
export function isValidStringTime(v: string | number | null) {
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
function toDateValues(value: string | number | Array<string>) {
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
function toTimeValues(value: string | number | Array<string>) {
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

function getConverter(converter: string) {
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
  if (formaters.includes(converter)) {
    return converter;
  }
  return formaters[0];
}
export function toValue(dateValues: Array<string>, timeValues: Array<string>, converter: string) {
  const dateValue = toDateValue(dateValues);
  const timeValue = toTimeValue(timeValues);
  const value = dayjs(`${dateValue} ${timeValue ? ` ${timeValue}` : ''}`).format('YYYY/MM/DD HH:mm:ss');
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
  if (format && formatters.includes(format)) {
    return format;
  }
  return formatters[0];
}

/**
 * 获取格式化值
 * @param values
 * @param unit
 * @param format
 * @returns
 */
export function getFormatValue(values: Array<Array<Array<string>>>, props: any) {
  const unit = props.get('unit');
  const format = props.get('showFormatter');
  const advancedFormatEnable = props.get('advancedFormatEnable');
  const advancedFormatValue = props.get('advancedFormatValue');
  const isEmpty = values.every((value) => value.length === 0);
  if (isEmpty) {
    return '';
  }
  const finalFormat =
    advancedFormatEnable && advancedFormatValue ? advancedFormatValue : getDisplayFormatter(unit, format);
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
