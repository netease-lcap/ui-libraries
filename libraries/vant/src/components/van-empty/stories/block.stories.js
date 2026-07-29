import Component from '../index';

export default {
  id: 'van-empty-blocks',
  title: '组件列表/Empty 空状态/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '空状态',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-empty image="default" description="暂无数据" />
    `,
  }),
};
