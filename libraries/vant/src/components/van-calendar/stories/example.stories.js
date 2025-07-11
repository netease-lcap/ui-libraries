import VanCalendar from '../index';

export default {
  id: 'van-calendar-examples',
  title: '组件列表/Calendar 日历/示例',
  component: VanCalendar,
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
      <van-calendar v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
    range: [new Date(), new Date()],
    show: true,
  },
};
