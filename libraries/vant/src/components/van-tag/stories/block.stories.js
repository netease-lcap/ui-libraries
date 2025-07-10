import Component from '../index';

export default {
  id: 'van-tag-blocks',
  title: '组件列表/Tag 标签/区块',
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
      <van-tag text="标签" ></van-tag>
    `,
  }),
};
