import { isNaN } from './number';

export function isDate(val: any): val is Date {
  return (
    Object.prototype.toString.call(val) === '[object Date]' &&
    !isNaN(val.getTime())
  );
}
