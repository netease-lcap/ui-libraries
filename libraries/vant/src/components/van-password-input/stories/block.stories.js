import Component from '../index';

export default {
  id: 'van-password-input-blocks',
  title: '组件列表/PasswordInput 密码输入框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '密码输入框',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-password-input  :length="6"></van-password-input>
    `,
  }),
};
