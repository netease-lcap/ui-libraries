import VanDatePicker from '../index';

export default {
  id: 'van-date-picker-examples',
  title: '组件列表/DatePicker 日期选择器/示例',
  component: VanDatePicker,
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
      <van-date-picker v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
