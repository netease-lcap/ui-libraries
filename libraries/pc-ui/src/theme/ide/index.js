import { colorDarken, colorLighten, colorOpacity } from './utils';

const ColorGradientList = [{
  title: '最浅',
  suffix: 'lightest',
  compute: (v) => colorLighten(v, 8 / 9),
}, {
  title: '更浅',
  suffix: 'lighter',
  compute: (v) => colorLighten(v, 6 / 9),
}, {
  title: '浅',
  suffix: 'light',
  compute: (v) => colorLighten(v, 1 / 9),
}, {
  title: '暗',
  suffix: 'dark',
  compute: (v) => colorDarken(v, 1 / 9),
}, {
  title: '更暗',
  suffix: 'darker',
  compute: (v) => colorDarken(v, 6 / 9),
}, {
  title: '最暗',
  suffix: 'darkest',
  compute: (v) => colorDarken(v, 8 / 9),
}];

const ColorGroups = [
  {
    key: 'colorPrimary',
    type: 'Color',
    name: '主色',
    desc: '',
    seedToken: ['--brand-primary'],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--brand-primary-disabled': colorLighten(value, 6 / 9),
        '--brand-primary-opacity-20': colorOpacity(value, 0.2),
      };

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-primary-${c.suffix}`] = c.compute(value);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorSuccess',
    type: 'Color',
    name: '成功色',
    desc: '',
    seedToken: ['--brand-success'],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {};

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-success-${c.suffix}`] = c.compute(value);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorWarning',
    type: 'Color',
    name: '警告色',
    desc: '',
    seedToken: ['--brand-warning'],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {};

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-warning-${c.suffix}`] = c.compute(value);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorError',
    type: 'Color',
    name: '错误色',
    desc: '',
    seedToken: ['--brand-error'],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {};

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-error-${c.suffix}`] = c.compute(value);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorDisabled',
    type: 'Color',
    name: '禁用色',
    desc: '',
    seedToken: ['--brand-disabled'],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {};

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-disabled-${c.suffix}`] = c.compute(value);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorBackground',
    type: 'Color',
    name: '背景色',
    desc: '',
    seedToken: ['--background-color-base'],
    mapToken: [],
  },
  {
    key: 'colorBorder',
    type: 'Color',
    name: '边框色',
    desc: '',
    seedToken: ['--border-color-base'],
    mapToken: [],
  },
  {
    key: 'colorText',
    type: 'Color',
    name: '文本色',
    desc: '',
    seedToken: ['--color-base'],
    mapToken: [],
  },
  {
    key: 'colorLink',
    type: 'Color',
    name: '链接色',
    desc: '',
    seedToken: ['--link-color'],
    mapToken: [],
  },
  {
    key: 'colorScrollbar',
    type: 'Color',
    name: '滚动条颜色',
    desc: '',
    seedToken: ['--scrollbar-background'],
    mapToken: [],
  },
  {
    key: 'colorScrollbarHover',
    type: 'Color',
    name: '滚动条颜色（hover）',
    desc: '',
    seedToken: ['--scrollbar-background-hover'],
    mapToken: [],
  },
];

const SizeGroups = [{
  key: 'space-shrink',
  name: '收缩间距',
  desc: '',
  seedToken: ['--space-shrink'],
  mapToken: [],
}, {
  key: 'space-small',
  name: '小间距',
  desc: '',
  seedToken: ['--space-small'],
  mapToken: [],
}, {
  key: 'space-base',
  name: '中等间距',
  desc: '',
  seedToken: ['--space-base'],
  mapToken: [],
}, {
  key: 'space-shrink',
  name: '大间距',
  desc: '',
  seedToken: ['--space-large'],
  mapToken: [],
}, {
  key: 'scrollbar-size',
  name: '滚动条宽度',
  desc: '',
  seedToken: ['--scrollbar-size'],
  mapToken: [],
}];

const StyleGroups = [{
  key: 'font-family',
  name: '基础字体',
  desc: '',
  seedToken: ['--font-family-zh-CN'],
  mapToken: [],
}, {
  key: 'font-size',
  name: '基础字体大小',
  desc: '',
  seedToken: ['--font-size-base'],
  mapToken: [],
}, {
  key: 'borderRadius',
  name: '圆角',
  desc: '',
  seedToken: ['--border-radius-base'],
  mapToken: [],
  getMapTokenValue: (seedTokenValues) => {
    return {
      '--border-radius-medium': seedTokenValues[0],
      '--border-radius-large': seedTokenValues[0],
    };
  },
}];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
