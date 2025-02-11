import { colorLighten, colorDarken } from './utils';

function createGenColorTokens(key) {
  function genColorToken(color, key) {
    const tokens = {
      [key]: color,
    };
    [3, 5, 7, 8, 9].forEach((i) => {
      tokens[`${key}-light-${i}`] = colorLighten(color, i / 10);
    });
    tokens[`${key}-dark-2`] = colorDarken(color, 0.2);
    return tokens;
  }

  return (seedTokenValues) => {
    const color = seedTokenValues[0];
    return genColorToken(color, key);
  };
}

const ColorGroups = [
  {
    key: 'colorPrimary',
    type: 'Color',
    name: '主色',
    desc: '',
    seedToken: ['--el-color-primary'],
    mapToken: [
      '--el-color-primary-light-3',
      '--el-color-primary-light-5',
      '--el-color-primary-light-7',
      '--el-color-primary-light-8',
      '--el-color-primary-light-9',
      '--el-color-primary',
      '--el-color-primary-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-primary'),
  },
  {
    key: 'colorSuccess',
    type: 'Color',
    name: '成功色',
    desc: '',
    seedToken: ['--el-color-success'],
    mapToken: [
      '--el-color-success-light-3',
      '--el-color-success-light-5',
      '--el-color-success-light-7',
      '--el-color-success-light-8',
      '--el-color-success-light-9',
      '--el-color-success',
      '--el-color-success-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-success'),
  },
  {
    key: 'colorWarning',
    type: 'Color',
    name: '警示色',
    desc: '',
    seedToken: ['--el-color-warning'],
    mapToken: [
      '--el-color-warning-light-3',
      '--el-color-warning-light-5',
      '--el-color-warning-light-7',
      '--el-color-warning-light-8',
      '--el-color-warning-light-9',
      '--el-color-warning',
      '--el-color-warning-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-warning'),
  },
  {
    key: 'colorDanger',
    type: 'Color',
    name: '危险色',
    desc: '',
    seedToken: ['--el-color-danger'],
    mapToken: [
      '--el-color-danger-light-3',
      '--el-color-danger-light-5',
      '--el-color-danger-light-7',
      '--el-color-danger-light-8',
      '--el-color-danger-light-9',
      '--el-color-danger',
      '--el-color-danger-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-danger'),
  },
  {
    key: 'colorError',
    type: 'Color',
    name: '错误色',
    desc: '',
    seedToken: ['--el-color-error'],
    mapToken: [
      '--el-color-error-light-3',
      '--el-color-error-light-5',
      '--el-color-error-light-7',
      '--el-color-error-light-8',
      '--el-color-error-light-9',
      '--el-color-error',
      '--el-color-error-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-error'),
  },
  {
    key: 'colorInfo',
    type: 'Color',
    name: '信息色',
    desc: '',
    seedToken: ['--el-color-info'],
    mapToken: [
      '--el-color-info-light-3',
      '--el-color-info-light-5',
      '--el-color-info-light-7',
      '--el-color-info-light-8',
      '--el-color-info-light-9',
      '--el-color-info',
      '--el-color-info-dark-2',
    ],
    getMapTokenValue: createGenColorTokens('--el-color-info'),
  },
  {
    key: 'colorBg',
    type: 'Color',
    name: '背景色',
    desc: '',
    seedToken: [
      '--el-bg-color',
      '--el-bg-color-page',
      '--el-bg-color-overlay',
    ],
    mapToken: [],
  },
  {
    key: 'colorText',
    type: 'Color',
    name: '文字色',
    desc: '',
    seedToken: [
      '--el-text-color-primary',
      '--el-text-color-regular',
      '--el-text-color-secondary',
      '--el-text-color-placeholder',
      '--el-text-color-disabled',
    ],
    mapToken: [],
  },
  {
    key: 'colorBorder',
    type: 'Color',
    name: '边框色',
    desc: '',
    seedToken: [
      '--el-border-color',
      '--el-border-color-light',
      '--el-border-color-lighter',
      '--el-border-color-extra-light',
      '--el-border-color-dark',
      '--el-border-color-darker',
      '--el-border-color-hover',
    ],
    mapToken: [],
  },
  {
    key: 'colorFill',
    type: 'Color',
    name: '填充色',
    desc: '',
    seedToken: [
      '--el-fill-color',
      '--el-fill-color-light',
      '--el-fill-color-lighter',
      '--el-fill-color-extra-light',
      '--el-fill-color-dark',
      '--el-fill-color-darker',
      '--el-fill-color-blank',
    ],
    mapToken: [],
  },
  {
    key: 'colorDisabled',
    type: 'Color',
    name: '禁用色',
    desc: '',
    seedToken: [
      '--el-disabled-bg-color',
      '--el-disabled-text-color',
      '--el-disabled-border-color',
    ],
    mapToken: [],
  },
  {
    key: 'colorOverlay',
    type: 'Color',
    name: '遮罩色',
    desc: '',
    seedToken: [
      '--el-overlay-color',
      '--el-overlay-color-light',
      '--el-overlay-color-lighter',
      '--el-mask-color',
      '--el-mask-color-extra-light',
    ],
    mapToken: [],
  },
];

const SizeGroups = [
  {
    key: 'fontSize',
    type: 'Size',
    name: '字体大小',
    desc: '',
    seedToken: [
      '--el-font-size-extra-large',
      '--el-font-size-large',
      '--el-font-size-medium',
      '--el-font-size-base',
      '--el-font-size-small',
      '--el-font-size-extra-small',
    ],
    mapToken: [],
  },
  {
    key: 'borderRadius',
    type: 'Size',
    name: '圆角',
    desc: '',
    seedToken: [
      '--el-border-radius-base',
      '--el-border-radius-small',
      '--el-border-radius-round',
    ],
    mapToken: [],
  },
  {
    key: 'componentSize',
    type: 'Size',
    name: '组件尺寸',
    desc: '',
    seedToken: [
      '--el-component-size-large',
      '--el-component-size',
      '--el-component-size-small',
    ],
    mapToken: [],
  },
];

const StyleGroups = [
  {
    key: 'fontFamily',
    type: 'Style',
    name: '字体',
    desc: '',
    seedToken: [
      '--el-font-family',
      '--el-font-weight-primary',
      '--el-font-line-height-primary',
    ],
    mapToken: [],
  },
  {
    key: 'boxShadow',
    type: 'Style',
    name: '阴影',
    desc: '',
    seedToken: [
      '--el-box-shadow',
      '--el-box-shadow-light',
      '--el-box-shadow-lighter',
      '--el-box-shadow-dark',
    ],
    mapToken: [],
  },
  {
    key: 'border',
    type: 'Style',
    name: '边框',
    desc: '',
    seedToken: [
      '--el-border-width',
      '--el-border-style',
      '--el-border',
      '--el-svg-monochrome-grey',
    ],
    mapToken: [],
  },
  {
    key: 'index',
    type: 'Style',
    name: '层级',
    desc: '',
    seedToken: [
      '--el-index-normal',
      '--el-index-top',
      '--el-index-popper',
    ],
    mapToken: [],
  },
  {
    key: 'transition',
    type: 'Style',
    name: '动效',
    desc: '',
    seedToken: [
      '--el-transition-duration',
      '--el-transition-duration-fast',
      '--el-transition-duration-slow',
      '--el-transition-function-ease-in-out-bezier',
      '--el-transition-function-fast-bezier',
      '--el-transition-function-ease-in-out-bezier',
      '--el-transition-all',
      '--el-transition-fade',
      '--el-transition-md-fade',
      '--el-transition-fade-linear',
      '--el-transition-border',
      '--el-transition-box-shadow',
      '--el-transition-color',
    ],
  },
];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
