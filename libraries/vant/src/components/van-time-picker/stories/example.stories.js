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
          <div>标题</div>
        </template>
        <template #topbar-left>
          <van-icon name="arrow-left" />
        </template>
        <template #topbar-center>
          <div>时间选择</div>
        </template>
        <template #bottombar-left>
          <van-button round>取消</van-button>
        </template>
        <template #bottombar-right>
          <van-button type="primary" round>确定</van-button>
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
    isRange: true,
  },
};
