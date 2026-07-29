import Component from '../index';

export default {
  id: 'van-rate-blocks',
  title: '组件列表/Rate 评分/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'Rate',
  render: () => ({
    setup() {
      return {
      };
    },
    template: `
      <van-rate :count="5"> </van-rate>
    `,
  }),
};
