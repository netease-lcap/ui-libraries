import Component from '../index';

export default {
  id: 'van-picker-blocks',
  title: '组件列表/Picker 选择器/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'Picker',
  render: () => ({
    setup() {},
    template: `
      <van-picker></van-picker>
    `,
  }),
};
