import Component from '../index';

export default {
  id: 'van-slider-blocks',
  title: '组件列表/Slider 滑块/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '滑块',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-slider v-model="50" ></van-slider>
    `,
  }),
};
