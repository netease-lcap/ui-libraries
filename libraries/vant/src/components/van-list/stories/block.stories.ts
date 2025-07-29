import Component from '../index';

export default {
  id: 'van-list-blocks',
  title: '组件列表/List 列表/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基础列表',
  render: () => ({
    setup() {},
    template: `
      <van-list> </van-list>
    `,
  }),
};

