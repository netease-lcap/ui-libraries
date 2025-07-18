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
      <van-count-down v-bind="args" @change="change" @finish="finish" />
    `,
  }),
  args: {
    time: 30 * 60 * 60 * 1000,
    millisecond: true,
    format: 'HH:mm:ss:SS',
    onChange(e) {
      console.log('onChange', e);
    },
    onFinish(e) {
      console.log('onFinish', e);
    },
  },
};
