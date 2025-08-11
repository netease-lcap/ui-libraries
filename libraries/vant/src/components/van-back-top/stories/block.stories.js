import Component from '../index';

export default {
  id: 'van-back-top-blocks',
  title: '组件列表/BackTop 返回顶部/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '返回顶部',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-back-top><van-icon name="back-top" style="font-size: 20px;font-weight:bold"/></van-back-top>
    `,
  }),
};
