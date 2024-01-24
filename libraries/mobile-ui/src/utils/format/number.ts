/* eslint-disable max-classes-per-file */
export function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char);
  let prefix = '';

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  if (char === '.' && value.match(/^(\.|-\.)/)) {
    prefix = index ? '-0' : '0';
  }

  return (
    prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
  );
}

export function formatNumber(
  value: string,
  allowDot = true,
  allowMinus = true
) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return (value.replace(regExp, ''));
  // return Number(value.replace(regExp, ''));
}

// add num and avoid float number
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

class Formatter {
  constructor() {
    this.format = this.format.bind(this);
    this.parse = this.parse.bind(this);
  }

  format(value: unknown) {
    return value;
  }

  parse(value: unknown) {
    return value;
  }
}

export class NumberFormatter extends Formatter {
  pattern: string;

  options: any;

  constructor(pattern = '0', options: unknown) {
    super()
    this.pattern = pattern;
    this.options = options || {};
  }

  format(value: number | string) {
    const { pattern } = this;

    // null undefined
    if (value === null || value === undefined || value === '') {
      return ''
    }

    if (typeof value !== 'number') {
      value = Number(value)
      // return pattern.replace(/[0#.,*]+/, value);
    }

    const number = (pattern.match(/[0#.,*]+/) || ['0'])[0];
    const parts = number.split('.');
    const fill = (parts[0].match(/0+$/) || ['0'])[0].length;
    const fixed = parts[1] === '*' ? null : (parts[1] ? parts[1].length : 0);
    const comma = pattern.includes(',');

    // 百分号
    if (this.options.percentSign) {
      value *= 100;
    }

    if (fixed !== null) {
      value = value.toFixed(fixed).padStart(fixed ? fill + 1 + fixed : fill, '0');
      // 是否小数隐藏末尾0
      if (fixed > 0 && /#$/.test(parts[1])) {
        value = parseFloat(value); // 转字符串
      }
    }

    // value强转字符串
    value = String(value);

    if (comma)
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 百分号
    if (this.options.percentSign) {
      value += '%';
    }

    value = pattern.replace(/[0#.,*]+/, value);

    return value;
  }

  parse(value: string) {
    const s = (String(value).match(/-?([0-9.,]+)/) || ['0'])[0];

    let n = +s.replace(/,/g, '');

    if (this.options.percentSign && /%$/.test(value)) {
      n /= 100;
    }

    return n;
  }
}

export const noopFormatter = new Formatter();
