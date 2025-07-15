import Component from '../index';

export default {
  id: 'van-time-picker-blocks',
  title: '组件列表/TimePicker 时间选择器/区块',
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
      <van-time-picker><template #label><van-text text="标题"></van-text></template></van-time-picker>
    `,
  }),
};
