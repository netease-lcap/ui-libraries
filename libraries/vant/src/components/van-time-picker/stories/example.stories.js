import VanTimePicker from '../index';

export default {
  id: 'van-time-picker-examples',
  title: '组件列表/TimePicker 时间选择器/示例',
  component: VanTimePicker,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-time-picker v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
