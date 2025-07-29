import Component from '../index';

export default {
  id: 'van-calendar-blocks',
  title: '组件列表/Calendar 日历/区块',
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
      <van-calendar>
        <template #label>
          <van-text text="标题"></van-text>
        </template>
        <template #title>
          <van-text text="日期选择"></van-text>
        </template>
      </van-calendar>
    `,
  }),
};
