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
    data() {
      return {
        value: '12:00',
      };
    },
    template: `
      <van-time-picker v-bind="args" v-model="value">
        <template #label>
          <div>文本</div>
        </template>
      </van-time-picker>
      <div>{{ value }}</div>
    `,
  }),
  args: {
    unit: 'hour',
    minTime: '07:40:00',
    maxTime: '10:20:00',
    title: '时间选择器',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showToolbar: true,
  },
};
