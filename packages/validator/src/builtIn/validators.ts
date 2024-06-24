/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import { isPlainObject, isEqual } from 'lodash';
import $ from 'validator';
import { Validator } from '../types';

// 非必填验证不需要为空判断，验证时会自动通过
export const validators = {
  required: (value: any): boolean => !(isNil(value) || value === ''),
  filled: (value: any): boolean => !!stringify(value).trim(),
  notEmpty: (value: any): boolean => !isEmpty(value),
  empty: (value: any): boolean => isEmpty(value),
  minLength: (value: any, min: number): boolean => (isNil(min) ? false : getLength(value) >= min),
  maxLength: (value: any, max: number): boolean => (isNil(max) ? false : getLength(value) <= max),
  rangeLength: (value: any, min: number, max: number): boolean => {
    if (isNil(min) || isNil(max)) {
      return false;
    }
    const length = getLength(value);
    return min <= length && length <= max;
  },
  // 仅支持数字、字符串、日期时间
  min: minImpl,
  // 仅支持数字、字符串、日期时间
  max: maxImpl,
  range: rangeImplement,
  pattern,
  is: (value: any, arg: any): boolean => value === arg,
  isNot: (value: any, arg: any): boolean => value !== arg,
  equals: (value: any, arg: any): boolean => isEqual(value, arg),
  notEquals: (value: any, arg: any): boolean => !isEqual(value, arg),
  includes: (value: any[], arr: any[]): boolean => arr.every((arg) => value.includes(arg)),
  excludes: (value: any[], arr: any[]): boolean => !arr.some((arg) => value.includes(arg)),
  included: (value: any[], arr: any[]): boolean => arr.includes(value),
  excluded: (value: any[], arr: any[]): boolean => !arr.includes(value),
  noDuplicates: (value: Array<any>): boolean => !hasDuplicates(value),
  string: (value: any): boolean => typeof value === 'string',
  number: (value: any): boolean => typeof value === 'number',
  numeric: (value: any, noSymbols?: boolean): boolean => $.isNumeric(stringify(value), {
    no_symbols: noSymbols,
  }),
  integer: (value: any): boolean => $.isInt(stringify(value)),
  decimal: (value: any, force?: boolean, digits?: string): boolean => $.isDecimal(stringify(value), {
    force_decimal: force,
    decimal_digits: digits,
  }),
  boolean: (value: any): boolean => typeof value === 'boolean',
  function: (value: any): boolean => typeof value === 'function',
  // removed since v380
  object: (value: any): boolean => typeof value === 'object',
  // displayed as object since v380
  plainObject: (value: any): boolean => isPlainObject(value),
  array: (value: any): boolean => Array.isArray(value),
  alpha: (value: any): boolean => $.isAlpha(stringify(value)),
  alphaNum: (value: any): boolean => $.isAlphanumeric(stringify(value)),
  alphaDash: (value: any): boolean => /^[a-zA-Z_]+$/.test(value),
  alphaNumDash: (value: any): boolean => /^[a-zA-Z0-9_]+$/.test(value),
  alphaSpaces: (value: any): boolean => /^[a-zA-Z\s]+$/.test(value),
  lowerCase: (value: any): boolean => $.isLowercase(stringify(value)),
  upperCase: (value: any): boolean => $.isUppercase(stringify(value)),
  '^az': (value: any): boolean => /^[a-z]/.test(value),
  '^az09': (value: any): boolean => /^[a-z0-9]/.test(value),
  '^az09_': (value: any): boolean => /^[a-z0-9_]/.test(value),
  '^azAZ': (value: any): boolean => /^[a-zA-Z]/.test(value),
  '^azAZ09': (value: any): boolean => /^[a-zA-Z0-9]/.test(value),
  '^azAZ09_': (value: any): boolean => /^[a-zA-Z0-9_]/.test(value),
  az09$: (value: any): boolean => /[a-z0-9]$/.test(value),
  azAZ09$: (value: any): boolean => /[a-zA-Z0-9]$/.test(value),
  '^09$': (value: any): boolean => /^[0-9]+$/.test(value),
  '^az09$': (value: any): boolean => /^[a-z0-9]+$/.test(value),
  '^az09-$': (value: any): boolean => /^[a-z0-9-]+$/.test(value),
  '^az09-.$': (value: any): boolean => /^[a-z0-9-.]+$/.test(value),
  '^azAZ09$': (value: any): boolean => /^[a-zA-Z0-9]+$/.test(value),
  '^azAZ09-$': (value: any): boolean => /^[a-zA-Z0-9-]+$/.test(value),
  '^azAZ09_$': (value: any): boolean => /^[a-zA-Z0-9_]+$/.test(value),
  '^azAZ09-_$': (value: any): boolean => /^[a-zA-Z0-9-_]+$/.test(value),
  '^az09-_$': (value: any): boolean => /^[a-z0-9-_]+$/.test(value),
  'without--': (value: any): boolean => !/-{2,}/.test(value),
  without__: (value: any): boolean => !/_{2,}/.test(value),
  email: (value: any): boolean => $.isEmail(stringify(value)),
  ip: (value: any, version): boolean => $.isIP(stringify(value), version),
  ipRange: (value: any, version): boolean => $.isIPRange(stringify(value), version),
  port: (value: any) => $.isPort(stringify(value)),
  url: (value: any) => $.isURL(stringify(value)),
  macAddress: (value: any): boolean => $.isMACAddress(stringify(value)),
  md5: (value: any): boolean => $.isMD5(stringify(value)),
  ascii: (value: any): boolean => $.isAscii(stringify(value)),
  // base32: (value: any): boolean => $.isBase32(stringify(value)), // type丢失
  base64: (value: any): boolean => $.isBase64(stringify(value)),
  byteLength: (value: any, min: number, max: number): boolean => $.isByteLength(stringify(value), { min, max }),
  dataURI: (value: any): boolean => $.isDataURI(stringify(value)),
  // magnetURI: (value: any): boolean => $.isMagnetURI(stringify(value)), // type丢失
  divisibleBy: (value: any, divisor: number): boolean => $.isDivisibleBy(stringify(value), divisor),
  halfWidth: (value: any): boolean => !$.isFullWidth(stringify(value)),
  fullWidth: (value: any): boolean => !$.isHalfWidth(stringify(value)),
  hash: (value: any, algorithm: any): boolean => $.isHash(stringify(value), algorithm),
  hexColor: (value: any): boolean => $.isHexColor(stringify(value)),
  hex: (value: any): boolean => $.isHexadecimal(stringify(value)),
  // identityCard: (value: any, locale: any) => $.isIdentityCard(stringify(value), locale ? locale : 'any'),
  creditCard: (value: any, issuer: Array<CreditCardIssuer>): boolean => isCreditCard(stringify(value), issuer),
  fqdn: (value: any): boolean => $.isFQDN(stringify(value)),
  // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
  ipOrFQDN: (value: any): boolean => $.isFQDN(stringify(value)) || $.isIP(stringify(value)),
  isbn: (value: any, version): boolean => $.isISBN(stringify(value), version),
  issn: (value: any): boolean => $.isISSN(stringify(value)),
  isin: (value: any): boolean => $.isISIN(stringify(value)),
  iso8601: (value: any, strict: boolean): boolean => $.isISO8601(stringify(value), { strict }),
  // rfc3339: (value: any): boolean => $.isRFC3339(stringify(value)),
  iso31661Alpha2: (value: any): boolean => $.isISO31661Alpha2(stringify(value)),
  iso31661Alpha3: (value: any): boolean => $.isISO31661Alpha3(stringify(value)),
  json: (value: any): boolean => $.isJSON(stringify(value)),
  jwt: (value: any): boolean => $.isJWT(stringify(value)),
  latLong: (value: any): boolean => $.isLatLong(stringify(value)),
  mobile: (value: any, locale?: any, strict?: boolean): boolean => $.isMobilePhone(stringify(value), locale || 'any', {
    strictMode: Boolean(strict),
  }),
  mongoId: (value: any): boolean => $.isMongoId(stringify(value)),
  postalCode: (value: any, locale: any): boolean => $.isPostalCode(stringify(value), locale),
  uuid: (value: any, version?: any): boolean => $.isUUID(stringify(value), version || 'all'),
  chinese: (value: any): boolean => isChinese(stringify(value)),
} as { [prop: string]: Validator };

function minImpl<T extends string | number | Date>(value: T, min: T): boolean {
  if (typeof value === 'string' && typeof min === 'string') {
    return value >= min;
  } if (typeof value === 'number' && typeof min === 'number') {
    return value >= min;
  } if (value instanceof Date && min instanceof Date) {
    return value >= min;
  }
  return false;
}

function maxImpl<T extends string | number | Date>(value: T, max: T): boolean {
  if (typeof value === 'string' && typeof max === 'string') {
    return value <= max;
  } if (typeof value === 'number' && typeof max === 'number') {
    return value <= max;
  } if (value instanceof Date && max instanceof Date) {
    return value <= max;
  }
  return false;
}

function rangeImplement<T extends string | number | Date>(
  value: T,
  min: T,
  max: T,
): boolean {
  return minImpl(value, min) && maxImpl(value, max);
}

type CreditCardIssuer =
  | 'amex'
  | 'dinersclub'
  | 'discover'
  | 'jcb'
  | 'mastercard'
  | 'unionpay'
  | 'visa'
  | '';

function isCreditCard(
  value: string,
  issuer?: Array<CreditCardIssuer>,
): boolean {
  // if (issuer?.length > 0 && issuer.map(toLower).includes('unionpay')) {
  //   return [/622\d{13,16}/,
  //   /603601\d{10}/,
  //   /603265\d{10}/,
  //   /621977\d{10}/,
  //   /603708\d{10}/,
  //   /602969\d{10}/,
  //   /601428\d{10}/,
  //   /603367\d{10}/,
  //   /603694\d{10}/].some(reg => value.match(reg)) || issuer.some(card => $.isCreditCard(value, { provider: card }))
  // } else
  if (issuer) {
    return issuer.some((card) => $.isCreditCard(value, { provider: card }));
  }
  return $.isCreditCard(value);
}

function stringifyObject(obj: any, indent: number = 0): string {
  let result = '';
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      result += `${' '.repeat(indent) + key}: \n`;
      result += stringifyObject(obj[key], indent + 2);
    } else {
      result += `${' '.repeat(indent) + key}: ${stringify(obj[key])}\n`;
    }
  }
  return result;
}

function stringifyMap(map: Map<any, any>, indent: number = 0): string {
  let result = '';
  for (const [key, value] of map) {
    if (value instanceof Map) {
      result += `${' '.repeat(indent) + key}: \n`;
      result += stringifyMap(value, indent + 2);
    } else if (typeof value === 'object') {
      result += `${' '.repeat(indent) + key}: \n`;
      result += stringifyObject(value, indent + 2);
    } else {
      result += `${' '.repeat(indent) + key}: ${stringify(value)}\n`;
    }
  }
  return result;
}

/**
 * 判断是否为空值（简单类型），undefined、null 或 ''
 * @param value
 */
function isNil(value: any) {
  return value === undefined || value === null;
}

/**
 * 判断是否为空值（简单类型+复杂类型），除了 undefined、null 或 ''，还包括空 [] 或 {}
 * @param value
 */
function isEmpty(value: any): boolean {
  if (isNil(value) || value === '') {
    return true;
  } if (Array.isArray(value)) {
    return !value.length;
  } if (value instanceof Map) {
    return !value.size;
  } if (value instanceof Object) {
    return !Object.keys(value).length;
  }
  return String(value).length === 0;
}

function hasDuplicates(value: Array<any>): boolean {
  return value.length !== new Set(value).size;
}

function isChinese(value: any) {
  return /^[\u4e00-\u9fa5]+$/gi.test(value);
}

function stringify(value: any): string {
  if (isEmpty(value)) {
    return '';
  } if (Array.isArray(value)) {
    return `[${value}]`;
  } if (value instanceof Map) {
    return stringifyObject(value);
  } if (value instanceof Object) {
    return stringifyMap(value);
  }
  return String(value);
}

function getLength(value: any) {
  if (isNil(value)) {
    return 0;
  } if (Array.isArray(value)) {
    return value.length;
  } if (value instanceof Map) {
    return value.size;
  } if (value instanceof Object) {
    return Object.keys(value).length;
  }
  // includes the case where value is a string
  return String(value).length;
}

// for lcap validate "pattern" rule
function pattern(
  value: any,
  re: string,
  allMatch: boolean = true,
  caseSensitive: boolean = true,
): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  let regExp: RegExp;
  if (allMatch) {
    regExp = new RegExp(`^${re}$`);
  } else {
    regExp = new RegExp(re);
  }
  let flags = regExp.flags.replace(/i/g, '');
  if (!caseSensitive) {
    flags += 'i';
  }
  return new RegExp(regExp.source, flags).test(value);
}

export default validators;
