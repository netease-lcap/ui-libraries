import Component from '../index';

export default {
  id: 'van-absolute-layout-blocks',
  title: '组件列表/AbsoluteLayout 绝对布局/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '绝对布局',
  render: () => ({
    template: `
      <van-absolute-layout></van-absolute-layout>
    `,
  }),
};
