const ColorGroups = [
  {
    key: 'colorPrimary',
    type: 'Color',
    name: '主色',
    desc: '',
    seedToken: ['--van-brand-primary'],
    mapToken: [],
  },
  {
    key: 'colorSuccess',
    type: 'Color',
    name: '成功色',
    desc: '',
    seedToken: ['--van-brand-success'],
    mapToken: [],
  },
  {
    key: 'colorWarning',
    type: 'Color',
    name: '警告色',
    desc: '',
    seedToken: ['--van-brand-warning'],
    mapToken: [],
  },
  {
    key: 'colorError',
    type: 'Color',
    name: '错误色',
    desc: '',
    seedToken: ['--van-brand-error'],
    mapToken: [],
  },
  {
    key: 'colorDisabled',
    type: 'Color',
    name: '禁用色',
    desc: '',
    seedToken: ['--van-brand-disabled'],
    mapToken: [],
  },
  {
    key: 'colorBackground',
    type: 'Color',
    name: '背景色',
    desc: '',
    seedToken: ['--van-component-background-color'],
    mapToken: [],
  },
  {
    key: 'colorBorder',
    type: 'Color',
    name: '边框色',
    desc: '',
    seedToken: ['--van-border-color'],
    mapToken: [],
  },
  {
    key: 'colorText',
    type: 'Color',
    name: '文本色',
    desc: '',
    seedToken: ['--van-component-text-color'],
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
];

const SizeGroups = [{
  key: 'space-shrink',
  name: '收缩间距',
  desc: '',
  seedToken: ['--van-space-shrink'],
  mapToken: [],
}, {
  key: 'space-small',
  name: '小间距',
  desc: '',
  seedToken: ['--van-space-small'],
  mapToken: [],
}, {
  key: 'space-base',
  name: '中等间距',
  desc: '',
  seedToken: ['--van-space-base'],
  mapToken: [],
}, {
  key: 'space-shrink',
  name: '大间距',
  desc: '',
  seedToken: ['--van-space-large'],
  mapToken: [],
}];

const StyleGroups = [{
  key: 'font-family',
  name: '基础字体',
  desc: '',
  seedToken: ['--van-base-font-family'],
  mapToken: [],
}, {
  key: 'font-size',
  name: '基础字体大小',
  desc: '',
  seedToken: ['--van-font-size-sm'],
  mapToken: [],
}, {
  key: 'borderRadius',
  name: '圆角',
  desc: '',
  seedToken: ['--van-border-radius-md'],
  mapToken: [],
}];

export default {
  color: ColorGroups,
  size: SizeGroups,
  style: StyleGroups,
};
