import Component from '../index';

export default {
  id: 'van-divider-blocks',
  title: '组件列表/Divider 分割线/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '分割线',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-divider>分割线</van-divider>
    `,
  }),
};
