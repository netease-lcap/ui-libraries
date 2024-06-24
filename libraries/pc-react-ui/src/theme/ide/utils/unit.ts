export function addUnit(num: number | string) {
  if (typeof num === 'number') {
    return ''.concat(String(num), 'px');
  }
  return num;
}

export function parseValue(value: number | string) {
  if (typeof value === 'number') {
    return value;
  }

  return parseFloat(value) || 0;
}
