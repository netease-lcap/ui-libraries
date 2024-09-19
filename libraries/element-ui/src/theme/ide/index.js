import {
  addUnit,
  colorDarken,
  colorLighten,
  parseValue,
} from './utils';
import { generate } from './palette';
import getFontSizes from './fontSize';

const tokens = (prefix) => new Array(7).fill('').map((t, i) => `${prefix}-${i + 1}`);

const ColorGroups = [
  {
    key: 'colorPrimary',
    type: 'Color',
    name: '品牌色',
    desc: '',
    seedToken: ['--el-color-primary-6'],
    mapToken: tokens('--el-color-primary'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--color-primary': value,
        '--slider-button-hover-color': colorDarken(value, 0.97),
        '--color-primary-dark-1': colorDarken(value, 0.1),
        '--color-primary-dark-2': colorDarken(value, 0.2),
      };

      [
        0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9,
      ].forEach((r, i) => {
        mappedValue[`--color-primary-light-${i + 1}`] = colorLighten(value, r);
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
    seedToken: ['--el-color-success-6'],
    mapToken: tokens('--el-color-success'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--color-success': value,
        '--color-success-dark-1': colorDarken(value, 0.1),
        '--color-success-dark-2': colorDarken(value, 0.2),
        '--color-success-light': colorLighten(value, 0.8),
        '--color-success-lighter': colorLighten(value, 0.9),
      };

      [
        0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9,
      ].forEach((r, i) => {
        mappedValue[`--color-success-light-${i + 1}`] = colorLighten(value, r);
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
    seedToken: ['--el-color-warning-6'],
    mapToken: tokens('--el-color-warning'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--color-warning': value,
        '--color-warning-dark-1': colorDarken(value, 0.1),
        '--color-warning-dark-2': colorDarken(value, 0.2),
        '--color-warning-light': colorLighten(value, 0.8),
        '--color-warning-lighter': colorLighten(value, 0.9),
      };

      generate(value).forEach((c, i) => {
        mappedValue[`--el-color-warning-${i + 1}`] = c;
      });

      [
        0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9,
      ].forEach((r, i) => {
        mappedValue[`--color-warning-light-${i + 1}`] = colorLighten(value, r);
      });

      return mappedValue;
    },
  },
  {
    key: 'colorError',
    type: 'Color',
    name: '错误色',
    desc: '',
    seedToken: ['--el-color-error-6'],
    mapToken: tokens('--el-color-error'),
    getMapTokenValue: (seedTokenValues) => {
      const value = seedTokenValues[0];
      const mappedValue = {
        '--color-danger': value,
        '--color-danger-dark-1': colorDarken(value, 0.1),
        '--color-danger-dark-2': colorDarken(value, 0.2),
        '--color-danger-light': colorLighten(value, 0.8),
        '--color-danger-lighter': colorLighten(value, 0.9),
      };

      [
        0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9,
      ].forEach((r, i) => {
        mappedValue[`--color-danger-light-${i + 1}`] = colorLighten(value, r);
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
      // '--el-color-background-6',
      // '--el-color-background-7',
      '--el-color-background-white',
      '--el-color-background-transparent',
    ],
    mapToken: [],
    getMapTokenValue: (seedTokenValues) => {
      const mappedValue = {
        '--color-info-dark-1': colorDarken(seedTokenValues[3], 0.1),
        '--color-info-dark-2': colorDarken(seedTokenValues[3], 0.2),
        '--color-info': seedTokenValues[3],
        '--color-info-light': colorLighten(seedTokenValues[3], 0.8),
        '--color-info-lighter': colorLighten(seedTokenValues[3], 0.9),
        '--background-color-base': seedTokenValues[4],
      };

      [
        0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9,
      ].forEach((r, i) => {
        mappedValue[`--color-info-light-${i + 1}`] = colorLighten(seedTokenValues[3], r);
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
        '--color-text-primary': seedTokenValues[0],
        '--color-text-regular': seedTokenValues[1],
        '--color-text-secondary': seedTokenValues[2],
        '--color-text-placeholder': seedTokenValues[3],
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
        '--border-color-lighter': seedTokenValues[1],
        '--border-color-light': seedTokenValues[2],
        '--border-color-base': seedTokenValues[3],
        '--border-color-extra-light': seedTokenValues[0],
      };
    },
  },
  {
    key: 'colorScrollbar',
    type: 'Color',
    name: '滚动条颜色',
    desc: '',
    seedToken: ['--scrollbar-background-color'],
    mapToken: [],
  },
  {
    key: 'colorScrollbarHover',
    type: 'Color',
    name: '滚动条颜色（hover）',
    desc: '',
    seedToken: ['--scrollbar-hover-background-color'],
    mapToken: [],
  },
];

const SizeGroups = [
  {
    key: 'font-size',
    name: '默认字号',
    desc: '',
    seedToken: ['--el-font-size-2'],
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

      mappedValue['--font-size-medium'] = mappedValue['--el-font-size-3'];
      mappedValue['--font-size-large'] = mappedValue['--el-font-size-4'];
      mappedValue['--font-size-extra-large'] = mappedValue['--el-font-size-5'];
      mappedValue['--font-size-small'] = addUnit(value - 1);
      mappedValue['--font-size-extra-small'] = mappedValue['--el-font-size-1'];

      return mappedValue;
    },
  },
  {
    key: 'spacing',
    name: '间距',
    desc: '',
    seedToken: ['--el-size-step', '--el-size-unit'],
    mapToken: [
      '--el-comp-size-xxxs',
      '--el-comp-size-xxs',
      '--el-comp-size-xs',
      '--el-comp-size-s',
      '--el-comp-size-m',
      '--el-comp-size-l',
      '--el-comp-size-xl',
      '--el-comp-size-xxl',
      '--el-comp-size-xxxl',
      '--el-comp-size-xxxxl',
      '--el-comp-size-xxxxxl',
      '--el-pop-padding-s',
      '--el-pop-padding-m',
      '--el-pop-padding-l',
      '--el-pop-padding-xl',
      '--el-pop-padding-xxl',
      '--el-comp-paddingLR-xxs',
      '--el-comp-paddingLR-xs',
      '--el-comp-paddingLR-s',
      '--el-comp-paddingLR-m',
      '--el-comp-paddingLR-l',
      '--el-comp-paddingLR-xl',
      '--el-comp-paddingLR-xxl',
      '--el-comp-paddingTB-xxs',
      '--el-comp-paddingTB-xs',
      '--el-comp-paddingTB-s',
      '--el-comp-paddingTB-m',
      '--el-comp-paddingTB-l',
      '--el-comp-paddingTB-xl',
      '--el-comp-paddingTB-xxl',
      '--el-comp-margin-xxs',
      '--el-comp-margin-xs',
      '--el-comp-margin-s',
      '--el-comp-margin-m',
      '--el-comp-margin-l',
      '--el-comp-margin-xl',
      '--el-comp-margin-xxl',
      '--el-comp-margin-xxxl',
      '--el-comp-margin-xxxxl',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const [step, unit] = seedTokenValues.map((n) => parseValue(n));
      const base = step * unit;
      const sizes = [];

      for (let i = 0; i < 12; i++) {
        const n = i - 5;
        sizes.push(base + unit * n);
      }

      sizes[2] = sizes[3] - Math.round(unit / 2);
      sizes[1] = sizes[2] - Math.round(unit / 2);
      sizes[0] = sizes[1] - Math.round(unit / 2);
      sizes[12] = sizes[11] + unit * 2;
      sizes[13] = sizes[12] + unit * 2;
      sizes[14] = sizes[13] + unit * 2;
      sizes[15] = sizes[14] + unit * 2;

      const mappedValue = {
      };

      sizes.forEach((s, i) => {
        const num = i + 1;
        mappedValue[`--el-size-${num}`] = addUnit(s);
      });

      return mappedValue;
    },
  },
  {
    key: 'scrollbar-size',
    name: '滚动条宽度',
    desc: '',
    seedToken: ['--scrollbar-size'],
    mapToken: [],
  },
];

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
    seedToken: ['--el-border-radius-3'],
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
        '--border-radius-small': seedTokenValues[1],
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
    getMapTokenValue: (seedTokenValues) => {
      return {
        '--box-shadow-light': seedTokenValues[0],
        '--box-shadow-base': seedTokenValues[1],
        '--box-shadow-dark': seedTokenValues[2],
      };
    },
  },
];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
