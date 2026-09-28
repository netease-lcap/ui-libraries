import Component from '../index';

export default {
  id: 'van-icon-blocks',
  title: '组件列表/Icon 图标/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-icon name="search" />
    `,
  }),
};
