import dayjs from 'dayjs';

/**
 * 获取格式化时间值
 * @param v 时间字符串
 * @returns 格式化时间值
 */
export function getFormatTimeValue(v: string | null) {
  if (!v) {
    return null;
  }
  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).toDate();
}

/**
 * 判断字符串是否为有效时间
 * @param v 时间字符串
 * @returns 是否为有效时间
 */
export function isValidStringTime(v: string | null) {
  if (!v) {
    return false;
  }
  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).isValid();
}

/**
 * 将字符串转换为数组
 * @param value
 * @returns
 */
function toValues(value: string | Array<string>) {
  if (typeof value === 'string' && isValidStringTime(value)) {
    return value.split(':');
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [];
}

/**
 * 将数组转换为字符串
 * @param values
 * @returns
 */
export function toValue(values: Array<string>) {
  return values && Array.isArray(values) && values.length > 0 ? values.join(':') : null;
}

/**
 * 获取当前值，转换成数组，并补全为 unitIndex 长度
 * @param value
 * @param unitIndex
 * @returns
 */
export function getCurrentValue(value: string | Array<string>, unitIndex: number) {
  const values = toValues(value || []);
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
    minute: ['HH:mm', 'HH时mm分'],
    second: ['HH:mm:ss', 'HH时mm分ss秒'],
    hour: ['HH', 'HH时'],
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
export function getFormatValue(values: Array<Array<string>>, unit: string, format: string) {
  const isEmpty = values.every((value) => value.length === 0);
  if (isEmpty) {
    return '';
  }
  format = getDisplayFormatter(unit, format);
  return values
    .map((value) => {
      const valueStr = value.join(':');
      if (!isValidStringTime(valueStr)) {
        return '';
      }
      const date = getFormatTimeValue(valueStr);
      return dayjs(date).format(format);
    })
    .join(' - ');
}
