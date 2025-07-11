import VanCountDown from '../index';

export default {
  id: 'van-count-down-examples',
  title: '组件列表/CountDown 倒计时/示例',
  component: VanCountDown,
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
      <van-count-down v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
