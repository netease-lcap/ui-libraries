/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import Color from 'color';

const colorMix = (color1, color2, ratio, reverse) => {
  if (color2.color[2] === 0) {
    color2.color[0] = color1.color[0];
    color2.color[1] = color1.color[1];
  }
  if (color2.color[2] === 100) {
    color2.color[0] = color1.color[0];
    color2.color[1] = color1.color[1];
  }
  const h = (color1.color[0] + ratio * (color2.color[0] - color1.color[0] - (reverse ? 360 : 0))) % 360;
  const s = color1.color[1] + ratio * (color2.color[1] - color1.color[1]);
  const l = color1.color[2] + ratio * (color2.color[2] - color1.color[2]);
  return Color.hsl(h, s, l);
};

export const colorDarken = (color, ratio) => {
  const base = new Color(color).hsl();
  const black = new Color('#000000').hsl();

  return colorMix(base, black, ratio).hex().toLowerCase();
};

export const colorLighten = (color, ratio) => {
  const base = new Color(color).hsl();
  const white = new Color('#fff').hsl();

  return colorMix(base, white, ratio).hex().toLowerCase();
};

export const colorOpacity = (color, ratio) => {
  return new Color(color).alpha(ratio).hexa().toLowerCase();
};
