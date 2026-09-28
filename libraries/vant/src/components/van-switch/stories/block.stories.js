import Component from '../index';

export default {
  id: 'van-switch-blocks',
  title: '组件列表/Switch 开关/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '开关',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-switch></van-switch>
    `,
  }),
};
