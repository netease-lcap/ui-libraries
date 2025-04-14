import Component from '../index';

export default {
  id: 'el-link-blocks',
  title: '组件列表/Link 链接/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '链接',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <el-link text="链接" />
    `,
  }),
};
