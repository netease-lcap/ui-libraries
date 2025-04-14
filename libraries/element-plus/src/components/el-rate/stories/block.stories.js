import Component from '../index';

export default {
  id: 'el-rate-blocks',
  title: '组件列表/Rate 评分/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '评分',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <el-rate />
    `,
  }),
};
