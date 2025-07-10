import Component from '../index';

export default {
  id: 'van-badge-blocks',
  title: '组件列表/Badge 徽标/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '按钮',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-badge  text="徽标" ></van-badge>
    `,
  }),
};
