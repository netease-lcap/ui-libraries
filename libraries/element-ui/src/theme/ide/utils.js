/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import Color from 'color';

const colorMix = (color1, color2, ratio) => {
  const c1 = Color(color1);
  const c2 = Color(color2);
  return c1.mix(c2, ratio).hex().toLowerCase();
};

export const colorDarken = (color, ratio) => {
  return colorMix(color, '#000', ratio);
};

export const colorLighten = (color, ratio) => {
  return colorMix(color, '#fff', ratio);
};

export const colorOpacity = (color, ratio) => {
  return new Color(color).alpha(ratio).hexa().toLowerCase();
};

export const getRgbStr = (color) => {
  return Color(color)
    .rgb()
    .round()
    .color
    .join(',');
}

const formats = ['hex', 'rgb', 'hsl'];

function getFormat(format) {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex';
  }
  return format;
}

export const getColorString = (color, format) => {
  const innerFormat = getFormat(format);

  if (innerFormat === 'hex') {
    return color[innerFormat]();
  }
  return color[innerFormat]().round().string();
}

export function addUnit(num) {
  if (typeof num === 'number') {
    return ''.concat(String(num), 'px');
  }
  return num;
}

export function parseValue(value) {
  if (typeof value === 'number') {
    return value;
  }

  return parseFloat(value) || 0;
}
