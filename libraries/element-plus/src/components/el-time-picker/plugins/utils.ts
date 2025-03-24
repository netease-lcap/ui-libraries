import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'HH:mm:ss';

export function getFormatTimeValue(v: string) {
  if (!v) {
    return null;
  }
  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).toDate();
}

export function isValidStringTime(v: string) {
  return dayjs(`${dayjs().format('YYYY-MM-DD')} ${v}`).isValid();
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

export function getNaslTimeValue(v, format: string = DEFAULT_FORMAT) {
  return dayjs(v).format(getFormatStr(format));
}
