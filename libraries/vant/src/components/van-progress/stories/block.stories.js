import Component from '../index';

export default {
  id: 'van-progress-blocks',
  title: '组件列表/Progress 进度条/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '线性进度条',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-progress :percentage="50"></van-progress>
    `,
  }),
};
