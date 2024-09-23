import {
  addUnit,
  colorDarken,
  colorLighten,
  colorOpacity,
  parseValue,
} from './utils';
import { generate } from './palette';
import getFontSizes from './fontSize';

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

const tokens = (prefix) => new Array(7).fill('').map((t, i) => `${prefix}-${i + 1}`);
const ColorGroups = [
  {
    key: 'colorPrimary',
    type: 'Color',
    name: '品牌色',
    desc: '',
    seedToken: ['--brand-primary'],
    mapToken: tokens('--el-color-primary'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--brand-primary': value,
        '--brand-primary-disabled': colorLighten(value, 6 / 9),
        '--brand-primary-opacity-20': colorOpacity(value, 0.2),
      };

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-primary-${c.suffix}`] = c.compute(value);
      });

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-primary-${i + 1}`] = c;
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
    mapToken: tokens('--el-color-success'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--brand-success': value,
      };

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-success-${c.suffix}`] = c.compute(value);
      });

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-success-${i + 1}`] = c;
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
    mapToken: tokens('--el-color-warning'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--brand-warning': value,
      };

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-warning-${c.suffix}`] = c.compute(value);
      });

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-warning-${i + 1}`] = c;
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
    mapToken: tokens('--el-color-error'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--brand-error': value,
      };

      ColorGradientList.forEach((c) => {
        mappedValue[`--brand-error-${c.suffix}`] = c.compute(value);
      });

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-error-${i + 1}`] = c;
      });

      return mappedValue;
    },
  },
  {
    key: 'colorLink',
    type: 'Color',
    name: '链接色',
    desc: '',
    seedToken: ['--el-color-link-6'],
    mapToken: tokens('--el-color-link'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--link-color': value,
      };

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-link-${i + 1}`] = c;
      });

      return mappedValue;
    },
  },
  {
    key: 'colorBackground',
    type: 'Color',
    name: '背景色',
    desc: '',
    seedToken: [
      '--el-color-background-1',
      '--el-color-background-2',
      '--el-color-background-3',
      '--el-color-background-4',
      '--el-color-background-5',
      '--el-color-background-6',
      '--el-color-background-7',
      '--el-color-background-white',
      '--el-color-background-transparent',
    ],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      return {
        '--background-color-base': seedTokenValues[3],
        '--background-color-disabled': seedTokenValues[4],
      };
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
    key: 'colorText',
    type: 'Color',
    name: '文本色',
    desc: '',
    seedToken: [
      '--el-color-text-1',
      '--el-color-text-2',
      '--el-color-text-3',
      '--el-color-text-4',
    ],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      return {
        '--color-base': seedTokenValues[0],
        '--color-light': seedTokenValues[2],
        '--color-lighter': seedTokenValues[3],
        '--font-first-color': seedTokenValues[0],
        '--font-second-color': seedTokenValues[1],
        '--font-third-color': seedTokenValues[2],
        '--font-disabled-color': seedTokenValues[3],
      };
    },
  },
  {
    key: 'colorBorder',
    type: 'Color',
    name: '边框色',
    desc: '',
    seedToken: [
      '--el-color-line-1',
      '--el-color-line-2',
      '--el-color-line-3',
      '--el-color-line-4',
    ],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      return {
        '--border-color-light': seedTokenValues[0],
        '--border-color-base': seedTokenValues[1],
      };
    },
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
  key: 'font-size',
  name: '默认字号',
  desc: '',
  seedToken: [
    '--font-size-base',
  ],
  mapToken: [
    '--el-font-size-1',
    '--el-font-size-2',
    '--el-font-size-3',
    '--el-font-size-4',
    '--el-font-size-5',
    '--el-font-size-6',
    '--el-font-size-7',
    '--el-font-size-8',
    '--el-font-size-9',
    '--el-line-height-1',
    '--el-line-height-2',
    '--el-line-height-3',
    '--el-line-height-4',
    '--el-line-height-5',
    '--el-line-height-6',
    '--el-line-height-7',
    '--el-line-height-8',
    '--el-line-height-9',
  ],
  getMapTokenValue: (seedTokenValues) => {
    const value = parseValue(seedTokenValues[0]);
    const mappedValue = {
      '--font-size-base': addUnit(value),
    };

    getFontSizes(value).forEach(({ size, lineHeight }, i) => {
      const num = i + 1;
      mappedValue[`--el-font-size-${num}`] = addUnit(size);
      mappedValue[`--el-line-height-${num}`] = String(lineHeight);
    });

    return mappedValue;
  },
}, {
  key: 'spacing',
  name: '间距',
  desc: '',
  seedToken: ['--el-size-step', '--el-size-unit'],
  mapToken: [
    '--el-margin-1',
    '--el-margin-2',
    '--el-margin-3',
    '--el-margin-4',
    '--el-margin-5',
    '--el-margin-6',
    '--el-margin-7',
    '--el-margin-8',
    '--el-margin-9',
    '--el-margin-10',
    '--el-padding-1',
    '--el-padding-2',
    '--el-padding-3',
    '--el-padding-4',
    '--el-padding-5',
    '--el-padding-6',
    '--el-padding-7',
    '--el-padding-8',
    '--el-padding-9',
    '--el-padding-10',
  ],
  getMapTokenValue: (seedTokenValues) => {
    const [step, unit] = seedTokenValues.map(n => parseValue(n));
    const base = step * unit;
    const sizes = [];

    for (let i = 0; i < 10; i++) {
      const n = i - 3;
      sizes.push(base + (unit * n));
    }
    const mappedValue = {
      '--space-base': addUnit(base),
      '--space-mini': addUnit(sizes[0]),
      '--space-small': addUnit(sizes[2]),
      '--space-medium': addUnit(sizes[5]),
      '--space-large': addUnit(sizes[7]),
      '--space-huge': addUnit(sizes[9]),
    };

    sizes.forEach((s, i) => {
      const num = i + 1;
      mappedValue[`--el-size-${num}`] = addUnit(s);
    });

    return mappedValue;
  },
}, {
  key: 'scrollbar-size',
  name: '滚动条宽度',
  desc: '',
  seedToken: ['--scrollbar-size'],
  mapToken: [],
}];

const StyleGroups = [
  {
    key: 'font-family',
    name: '基础字体',
    desc: '',
    seedToken: ['--font-family-zh-CN'],
    mapToken: [],
  },
  {
    key: 'borderRadius',
    name: '圆角',
    desc: '',
    seedToken: ['--border-radius-base'],
    mapToken: [
      '--el-border-radius-1',
      '--el-border-radius-2',
      '--el-border-radius-3',
      '--el-border-radius-4',
      '--el-border-radius-5',
      '--el-border-radius-6',
      '--el-border-radius-7',
      '--el-border-radius-8',
      '--el-border-radius-9',
      '--el-border-radius-10',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const base = parseValue(value);
      const mappedValue = {
        '--border-radius-base': value,
        '--border-radius-medium': value,
        '--border-radius-large': value,
        '--el-border-radius-1': '0px',
        '--el-border-radius-10': '100%',
      };

      const radius = [];
      let posValue;
      for (let i = 0; i < 8; i++) {
        if (i === 0) {
          posValue = base - 2;
        } else if (i > 3) {
          posValue += 4;
        } else {
          posValue += 2;
        }

        radius.push(posValue);
      }

      radius.forEach((n, i) => {
        mappedValue[`--el-border-radius-${i + 2}`] = addUnit(n);
      });

      return mappedValue;
    },
  },
  {
    key: 'boxShadow',
    type: 'BoxShadow',
    name: '阴影',
    desc: '',
    seedToken: ['--el-box-shadow-1', '--el-box-shadow-2', '--el-box-shadow-3'],
    mapToken: [],
  },
];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
