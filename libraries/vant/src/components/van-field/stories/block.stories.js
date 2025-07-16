import Component from '../index';

export default {
  id: 'van-field-blocks',
  title: '组件列表/Field 输入框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '输入框',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-field   ></van-field>
    `,
  }),
};
