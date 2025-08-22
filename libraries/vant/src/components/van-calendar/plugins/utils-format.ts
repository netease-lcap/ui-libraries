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
 * 获取Date格式的日期值
 * @param v 日期值
 * @returns 日期值
 */
export function getDateValue(v: DateValue) {
  if (isValidStringTime(v)) {
    return new Date(dayjs(v).format('YYYY/MM/DD HH:mm:ss'));
  }
  return null;
}

/**
 * 获取当前日期值
 * @param v 日期值
 * @param type 类型
 * @returns 日期值
 */
export function getCurrentValue(v: DateValue | Array<DateValue>) {
  if (Array.isArray(v)) {
    return v.map(getDateValue);
  }
  return getDateValue(v);
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
    maxDateValue = getDateValue(maxDate);
  }
  if (isValidStringTime(minDate)) {
    minDateValue = getDateValue(minDate);
  }
  return { maxDateValue, minDateValue };
}

/**
 * 获取转换器
 * @param converter
 * @returns
 */
function getConverter(converter?: string) {
  const formaters = ['YYYY/MM/DD', 'json', 'timestamp', 'date'];
  if (converter && formaters.includes(converter)) {
    return converter;
  }
  return formaters[0];
}

/**
 * 获取日期值，并转换为指定格式
 * @param v 日期值
 * @param converter 转换器
 * @returns 日期值
 */
function getDateValueWithConverter(v: DateValue, converter?: string) {
  if (!isValidStringTime(v)) {
    return null;
  }
  v = dayjs(v).format('YYYY/MM/DD HH:mm:ss');
  const finalConverter = getConverter(converter);
  if (finalConverter === 'json') {
    return new Date(v).toJSON();
  }
  if (finalConverter === 'timestamp') {
    return +new Date(v);
  }
  if (finalConverter === 'date') {
    return new Date(v);
  }
  return dayjs(v).format(finalConverter);
}

/**
 * 获取日期值，并转换为指定格式
 * @param v 日期值
 * @param converter 转换器
 * @returns 日期值
 */
export function toValue(v: DateValue | Array<DateValue>, converter: string) {
  if (Array.isArray(v)) {
    return v.map((item) => getDateValueWithConverter(item, converter));
  }
  return getDateValueWithConverter(v, converter);
}

function getDisplayFormatter(format: string) {
  const formaters = ['YYYY-MM-DD', 'M/D/YYYY', 'D/M/YYYY', 'YYYY年M月D日'];
  if (format && formaters.includes(format)) {
    return format;
  }
  return formaters[0];
}

/**
 * 获取格式化值
 * @param values 日期值
 * @param props 属性
 * @returns 格式化值
 */
export function getFormatValue(value: DateValue | Array<DateValue>, options: any) {
  const { showFormatter, advancedFormatEnable, advancedFormatValue, type } = options;
  const isEmpty = Array.isArray(value) ? value.every((value) => !value) : !value;
  if (isEmpty) {
    return '';
  }
  if (type === 'multiple' && Array.isArray(value)) {
    return `选择了${value.length}个日期`;
  }
  const finalFormat = advancedFormatEnable && advancedFormatValue ? advancedFormatValue : getDisplayFormatter(showFormatter);
  if (type === 'range' && Array.isArray(value)) {
    return [dayjs(value[0]).format(finalFormat), dayjs(value[1]).format(finalFormat)];
  }
  if (type === 'single' && !Array.isArray(value)) {
    return dayjs(value).format(finalFormat);
  }
  return '';
}
