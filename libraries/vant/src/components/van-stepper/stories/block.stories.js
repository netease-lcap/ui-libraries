import Component from '../index';

export default {
  id: 'van-stepper-blocks',
  title: '组件列表/Stepper 步进器/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '步进器',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-stepper ></van-stepper>
    `,
  }),
};
