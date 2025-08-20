import Component from '../index';

export default {
  id: 'van-circle-blocks',
  title: '组件列表/Circle 环形进度条/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '圆环',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-circle  ></van-circle>
    `,
  }),
};
