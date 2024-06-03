import { TinyColor } from '@ctrl/tinycolor';
import {
  generateColorPalettes,
  generateNeutralColorPalette,
} from './utils/color';
import genFontSizes from './utils/fontSize';
import genSizes from './utils/size';
import genRadius from './utils/radius';
import { addUnit, parseValue } from './utils/unit';

const ColorGroups = [
  {
    key: 'brandColor',
    type: 'Color',
    name: '品牌色',
    desc: '代表品牌身份、品牌形象和品牌价值观的颜色',
    seedToken: ['--cw-color-primary'],
    mapToken: [
      '--cw-color-primary-bg',
      '--cw-color-primary-bg-hover',
      '--cw-color-primary-border',
      '--cw-color-primary-border-hover',
      '--cw-color-primary-hover',
      '--cw-color-primary',
      '--cw-color-primary-active',
      '--cw-color-primary-text-hover',
      '--cw-color-primary-text',
      '--cw-color-primary-text-active',
    ],
    aliasToken: [
      '--cw-control-item-bg-active',
      '--cw-control-item-bg-active-hover',
      '--cw-control-outline',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const primaryColors = generateColorPalettes(seedTokenValues[0]);

      const mapTokenValue = {};
      [
        '--cw-color-primary-bg',
        '--cw-color-primary-bg-hover',
        '--cw-color-primary-border',
        '--cw-color-primary-border-hover',
        '--cw-color-primary-hover',
        '--cw-color-primary',
        '--cw-color-primary-active',
        '--cw-color-primary-text-hover',
        '--cw-color-primary-text',
        '--cw-color-primary-text-active',
      ].forEach((key, i) => {
        mapTokenValue[key] = primaryColors[i + 1];
      });

      return mapTokenValue;
    },
  },
  {
    key: 'successColor',
    type: 'Color',
    name: '成功色',
    desc: '表示成功、完成或者达成目标等积极意义的颜色',
    seedToken: ['--cw-color-success'],
    mapToken: [
      '--cw-color-success-bg',
      '--cw-color-success-bg-hover',
      '--cw-color-success-border',
      '--cw-color-success-border-hover',
      '--cw-color-success-hover',
      '--cw-color-success',
      '--cw-color-success-active',
      '--cw-color-success-text-hover',
      '--cw-color-success-text',
      '--cw-color-success-text-active',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateColorPalettes(seedTokenValues[0]);

      const mapTokenValue = {};
      [
        '--cw-color-success-bg',
        '--cw-color-success-bg-hover',
        '--cw-color-success-border',
        '--cw-color-success-border-hover',
        '--cw-color-success-hover',
        '--cw-color-success',
        '--cw-color-success-active',
        '--cw-color-success-text-hover',
        '--cw-color-success-text',
        '--cw-color-success-text-active',
      ].forEach((key, i) => {
        mapTokenValue[key] = colors[i + 1];
      });

      return mapTokenValue;
    },
  },
  {
    key: 'warningColor',
    type: 'Color',
    name: '警戒色',
    desc: '表示警示、提醒等负面信息的颜色',
    seedToken: ['--cw-color-warning'],
    mapToken: [
      '--cw-color-warning-bg',
      '--cw-color-warning-bg-hover',
      '--cw-color-warning-border',
      '--cw-color-warning-border-hover',
      '--cw-color-warning-hover',
      '--cw-color-warning',
      '--cw-color-warning-active',
      '--cw-color-warning-text-hover',
      '--cw-color-warning-text',
      '--cw-color-warning-text-active',
    ],
    aliasToken: ['--cw-color-warning-outline'],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateColorPalettes(seedTokenValues[0]);

      const mapTokenValue = {};
      [
        '--cw-color-warning-bg',
        '--cw-color-warning-bg-hover',
        '--cw-color-warning-border',
        '--cw-color-warning-border-hover',
        '--cw-color-warning-hover',
        '--cw-color-warning',
        '--cw-color-warning-active',
        '--cw-color-warning-text-hover',
        '--cw-color-warning-text',
        '--cw-color-warning-text-active',
      ].forEach((key, i) => {
        mapTokenValue[key] = colors[i + 1];
      });

      return mapTokenValue;
    },
  },
  {
    key: 'errorColor',
    type: 'Color',
    name: '错误色',
    desc: '表示失败、未完成或者错误等负面信息的颜色',
    seedToken: ['--cw-color-error'],
    mapToken: [
      '--cw-color-error-bg',
      '--cw-color-error-bg-hover',
      '--cw-color-error-border',
      '--cw-color-error-border-hover',
      '--cw-color-error-hover',
      '--cw-color-error',
      '--cw-color-error-active',
      '--cw-color-error-text-hover',
      '--cw-color-error-text',
      '--cw-color-error-text-active',
    ],
    aliasToken: ['--cw-color-error-outline', '--cw-color-highlight'],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateColorPalettes(seedTokenValues[0]);

      const mapTokenValue = {};
      [
        '--cw-color-error-bg',
        '--cw-color-error-bg-hover',
        '--cw-color-error-border',
        '--cw-color-error-border-hover',
        '--cw-color-error-hover',
        '--cw-color-error',
        '--cw-color-error-active',
        '--cw-color-error-text-hover',
        '--cw-color-error-text',
        '--cw-color-error-text-active',
      ].forEach((key, i) => {
        mapTokenValue[key] = colors[i + 1];
      });

      return mapTokenValue;
    },
  },
  {
    key: 'infoColor',
    type: 'Color',
    name: '信息色',
    desc: '表示信息、引导等中性信息的颜色',
    seedToken: ['--cw-color-info'],
    mapToken: [
      '--cw-color-info-bg',
      '--cw-color-info-bg-hover',
      '--cw-color-info-border',
      '--cw-color-info-border-hover',
      '--cw-color-info-hover',
      '--cw-color-info',
      '--cw-color-info-active',
      '--cw-color-info-text-hover',
      '--cw-color-info-text',
      '--cw-color-info-text-active',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateColorPalettes(seedTokenValues[0]);

      const mapTokenValue = {};
      [
        '--cw-color-info-bg',
        '--cw-color-info-bg-hover',
        '--cw-color-info-border',
        '--cw-color-info-border-hover',
        '--cw-color-info-hover',
        '--cw-color-info',
        '--cw-color-info-active',
        '--cw-color-info-text-hover',
        '--cw-color-info-text',
        '--cw-color-info-text-active',
      ].forEach((key, i) => {
        mapTokenValue[key] = colors[i + 1];
      });

      return mapTokenValue;
    },
  },
  {
    key: 'linkColor',
    type: 'Color',
    name: '链接色',
    desc: '表示链接的颜色，默认跟随信息色',
    seedToken: ['--cw-color-link'],
    mapToken: ['--cw-color-link-hover', '--cw-color-link-active'],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateColorPalettes(seedTokenValues[0]);

      return {
        '--cw-color-link-hover': colors[4],
        '--cw-color-link-active': colors[7],
      };
    },
  },
  {
    key: 'neutralColor',
    type: 'Color',
    name: '中性色',
    desc: '中性色主要被大量的应用在界面的文字、背景、边框和填充的 4 种场景。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。',
    seedToken: ['--cw-color-text-base', '--cw-color-bg-base'],
    mapToken: [
      '--cw-color-text',
      '--cw-color-text-secondary',
      '--cw-color-text-tertiary',
      '--cw-color-text-quaternary',
      '--cw-color-bg-container',
      '--cw-color-bg-elevated',
      '--cw-color-bg-layout',
      '--cw-color-bg-spotlight',
      '--cw-color-bg-mask',
      '--cw-color-border',
      '--cw-color-border-secondary',
      '--cw-color-fill',
      '--cw-color-fill-secondary',
      '--cw-color-fill-tertiary',
      '--cw-color-fill-quaternary',
    ],
    aliasToken: [
      '--cw-color-text-heading',
      '--cw-color-text-label',
      '--cw-color-text-description',
      '--cw-color-text-disabled',
      '--cw-color-text-placeholder',
      '--cw-color-icon',
      '--cw-color-icon-hover',
      '--cw-color-border-bg',
      '--cw-control-tmp-outline',
      '--cw-color-fill-alter',
      '--cw-color-fill-content',
      '--cw-color-fill-content-hover',
      '--cw-control-item-bg-hover',
      '--cw-color-bg-container-disabled',
      '--cw-color-bg-text-active',
      '--cw-color-bg-text-hover',
      '--cw-color-error-outline',
      '--cw-color-split',
      '--cw-color-warning-outline',
      '--cw-control-item-bg-active-disabled',
      '--cw-control-outline',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const colors = generateNeutralColorPalette(
        seedTokenValues[1],
        seedTokenValues[0],
      );

      return {
        '--cw-color-text': colors.colorText,
        '--cw-color-text-secondary': colors.colorTextSecondary,
        '--cw-color-text-tertiary': colors.colorTextTertiary,
        '--cw-color-text-quaternary': colors.colorTextQuaternary,
        '--cw-color-bg-container': colors.colorBgContainer,
        '--cw-color-bg-elevated': colors.colorBgElevated,
        '--cw-color-bg-layout': colors.colorBgLayout,
        '--cw-color-bg-spotlight': colors.colorBgSpotlight,
        '--cw-color-bg-mask': new TinyColor('#000')
          .setAlpha(0.45)
          .toRgbString(),
        '--cw-color-border': colors.colorBorder,
        '--cw-color-border-secondary': colors.colorBorderSecondary,
        '--cw-color-fill': colors.colorFill,
        '--cw-color-fill-secondary': colors.colorFillSecondary,
        '--cw-color-fill-tertiary': colors.colorFillTertiary,
        '--cw-color-fill-quaternary': colors.colorFillQuaternary,
      };
    },
  },
];

const SizeGroups = [
  {
    key: 'font',
    name: '文字',
    desc: '',
    seedToken: ['--cw-font-size'],
    mapToken: [
      '--cw-font-size',
      '--cw-font-size-sm',
      '--cw-font-size-lg',
      '--cw-font-size-xl',
      '--cw-font-size-heading-1',
      '--cw-font-size-heading-2',
      '--cw-font-size-heading-3',
      '--cw-font-size-heading-4',
      '--cw-font-size-heading-5',
      '--cw-line-height',
      '--cw-line-height-sm',
      '--cw-line-height-lg',
      '--cw-line-height-heading-1',
      '--cw-line-height-heading-2',
      '--cw-line-height-heading-3',
      '--cw-line-height-heading-4',
      '--cw-line-height-heading-5',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const fontSizePairs = genFontSizes(parseValue(seedTokenValues[0]));
      const fontSizes = fontSizePairs.map((pair) => pair.size);
      const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);

      const fontSizeMD = fontSizes[1];
      const fontSizeSM = fontSizes[0];
      const fontSizeLG = fontSizes[2];
      const lineHeight = lineHeights[1];
      const lineHeightSM = lineHeights[0];
      const lineHeightLG = lineHeights[2];

      return {
        '--cw-font-size': addUnit(fontSizeMD),
        '--cw-font-size-sm': addUnit(fontSizeSM),
        '--cw-font-size-lg': addUnit(fontSizeLG),
        '--cw-font-size-xl': addUnit(fontSizes[3]),
        '--cw-font-height': addUnit(Math.round(lineHeight * fontSizeMD)),
        '--cw-font-height-lg': addUnit(Math.round(lineHeightLG * fontSizeLG)),
        '--cw-font-height-sm': addUnit(Math.round(lineHeightSM * fontSizeSM)),
        '--cw-font-size-heading-1': addUnit(fontSizes[6]),
        '--cw-font-size-heading-2': addUnit(fontSizes[5]),
        '--cw-font-size-heading-3': addUnit(fontSizes[4]),
        '--cw-font-size-heading-4': addUnit(fontSizes[3]),
        '--cw-font-size-heading-5': addUnit(fontSizes[2]),
        '--cw-line-height': String(lineHeight),
        '--cw-line-height-sm': String(lineHeightSM),
        '--cw-line-height-lg': String(lineHeightLG),
        '--cw-line-height-heading-1': String(lineHeights[6]),
        '--cw-line-height-heading-2': String(lineHeights[5]),
        '--cw-line-height-heading-3': String(lineHeights[4]),
        '--cw-line-height-heading-4': String(lineHeights[3]),
        '--cw-line-height-heading-5': String(lineHeights[2]),
      };
    },
  },
  {
    key: 'spacing',
    name: '间距',
    desc: '',
    seedToken: ['--cw-size-step', '--cw-size-unit'],
    mapToken: [
      '--cw-margin-xxs',
      '--cw-margin-xs',
      '--cw-margin-sm',
      '--cw-margin',
      '--cw-margin-md',
      '--cw-margin-lg',
      '--cw-margin-xl',
      '--cw-margin-xxl',
      '--cw-padding-xxs',
      '--cw-padding-xs',
      '--cw-padding-sm',
      '--cw-padding',
      '--cw-padding-md',
      '--cw-padding-lg',
      '--cw-padding-xl',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const [sizeStep, sizeUnit] = seedTokenValues;
      const sizes = genSizes({
        sizeStep: parseValue(sizeStep),
        sizeUnit: parseValue(sizeUnit),
      });

      return {
        '--cw-size-xxl': addUnit(sizes.sizeXXL),
        '--cw-size-xl': addUnit(sizes.sizeXL),
        '--cw-size-lg': addUnit(sizes.sizeLG),
        '--cw-size-md': addUnit(sizes.sizeMD),
        '--cw-size-ms': addUnit(sizes.sizeMS),
        '--cw-size': addUnit(sizes.size),
        '--cw-size-sm': addUnit(sizes.sizeSM),
        '--cw-size-xs': addUnit(sizes.sizeXS),
        '--cw-size-xxs': addUnit(sizes.sizeXXS),
      };
    },
  },
];

const StyleGroups = [
  {
    key: 'borderRadius',
    type: 'BorderRadius',
    name: '圆角',
    desc: '',
    seedToken: ['--cw-border-radius'],
    mapToken: [
      '--cw-border-radius-xs',
      '--cw-border-radius-sm',
      '--cw-border-radius',
      '--cw-border-radius-lg',
    ],
    getMapTokenValue: (seedTokenValues) => {
      const radiusToken = genRadius(parseValue(seedTokenValues[0]));

      return {
        '--cw-border-radius-xs': addUnit(radiusToken.borderRadiusXS),
        '--cw-border-radius-sm': addUnit(radiusToken.borderRadiusSM),
        '--cw-border-radius': addUnit(radiusToken.borderRadius),
        '--cw-border-radius-lg': addUnit(radiusToken.borderRadiusLG),
      };
    },
  },
  {
    key: 'boxShadow',
    type: 'BoxShadow',
    name: '阴影',
    desc: '',
    seedToken: ['--cw-box-shadow', '--cw-box-shadow-secondary'],
    mapToken: [],
  },
];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
