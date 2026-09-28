const ColorGroups = [
  {
    key: 'primary',
    name: '基础色',
    desc: '',
    seedToken: [
      '--van-gray-1',
      '--van-gray-2',
      '--van-gray-3',
      '--van-gray-4',
      '--van-gray-5',
      '--van-gray-6',
      '--van-gray-7',
      '--van-gray-8',
      '--van-red',
      '--van-blue',
      '--van-orange',
      '--van-orange-dark',
      '--van-orange-light',
      '--van-green',
    ],
    mapToken: [],
  },
  {
    key: 'primary',
    name: '主色',
    desc: '',
    seedToken: ['--van-primary-color'],
    mapToken: [],
  },
  {
    key: 'success',
    name: '成功色',
    desc: '',
    seedToken: ['--van-success-color'],
    mapToken: [],
  },
  {
    key: 'danger',
    name: '危险色',
    desc: '',
    seedToken: ['--van-danger-color'],
    mapToken: [],
  },
  {
    key: 'warning',
    name: '警告色',
    desc: '',
    seedToken: ['--van-warning-color'],
    mapToken: [],
  },
  {
    key: 'text',
    name: '文本色',
    desc: '',
    seedToken: ['--van-text-color', '--van-text-color-2', '--van-text-color-3'],
    mapToken: [],
  },
  {
    key: 'active',
    name: '激活色',
    desc: '',
    seedToken: ['--van-active-color'],
    mapToken: [],
  },
  {
    key: 'background',
    name: '背景色',
    desc: '',
    seedToken: ['--van-background', '--van-background-2', '--van-background-3'],
    mapToken: [],
  },
  {
    key: 'border',
    name: '边框色',
    desc: '',
    seedToken: ['--van-border-color'],
    mapToken: [],
  },
];

const SizeGroups = [
  {
    key: 'padding',
    name: '内边距',
    desc: '',
    seedToken: [
      '--van-padding-base',
      '--van-padding-xs',
      '--van-padding-sm',
      '--van-padding-md',
      '--van-padding-lg',
      '--van-padding-xl',
    ],
    mapToken: [],
  },
  {
    key: 'font',
    name: '字体行高',
    desc: '',
    seedToken: [
      '--van-font-size-xs',
      '--van-line-height-xs',
      '--van-font-size-sm',
      '--van-line-height-sm',
      '--van-font-size-md',
      '--van-line-height-md',
      '--van-font-size-lg',
      '--van-line-height-lg',
    ],
    mapToken: [],
  },
  {
    key: 'borderRadius',
    name: '圆角',
    desc: '',
    seedToken: ['--van-border-radius-sm', '--van-border-radius-md', '--van-border-radius-lg'],
    mapToken: [],
  },
];

const StyleGroups = [
  {
    key: 'gradient',
    name: '渐变',
    desc: '',
    seedToken: ['--van-gradient-red', '--van-gradient-orange'],
    mapToken: [],
  },
  {
    key: 'opacity',
    name: '透明度',
    desc: '',
    seedToken: ['--van-active-opacity', '--van-disabled-opacity'],
    mapToken: [],
  },
  {
    key: 'font',
    name: '字体',
    desc: '',
    seedToken: ['--van-base-font', '--van-price-font', '--van-font-bold'],
    mapToken: [],
  },
  {
    key: 'transition',
    name: '动效',
    desc: '',
    seedToken: ['--van-duration-base', '--van-duration-fast', '--van-ease-out', '--van-ease-in'],
    mapToken: [],
  },
  {
    key: 'borderWidth',
    name: '边框宽度',
    desc: '',
    seedToken: ['--van-border-width'],
    mapToken: [],
  },
];

const PrimaryColorGroups = [
  {
    key: 'primary',
    name: '主色',
    desc: '',
    seedToken: ['--van-primary-color'],
    mapToken: [],
  },
  {
    key: 'hover',
    name: '主题色hover',
    desc: '',
    seedToken: ['--van-active-color'],
    mapToken: [],
  },
  {
    key: 'background',
    name: '背景色',
    desc: '',
    seedToken: ['--van-background'],
    mapToken: [],
  },
];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
  primaryColor: PrimaryColorGroups,
};
