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
        startValue: '12:00',
        endValue: '13:00',
      };
    },
    methods: {
      onConfirm(event) {
        console.log('onConfirm', event);
      },
      onCancel(event) {
        console.log('onCancel', event);
      },
      open() {
        this.$refs.timePicker.open();
      },
    },
    template: `
      <van-button @click="open">打开</van-button>
      <van-time-picker ref="timePicker" v-bind="args" v-model:modelValue="value" v-model:startValue="startValue" v-model:endValue="endValue" @confirm="onConfirm" @cancel="onCancel">
        <template #label>
          <div>标题</div>
        </template>
        <template #topbarleft>
          <van-icon name="arrow-left" />
        </template>
        <template #topbarcenter>
          <div>时间选择</div>
        </template>
        <template #bottombarleft>
          <van-button :round="true">取消</van-button>
        </template>
        <template #bottombarright>
          <van-button type="primary" :round="true">确认</van-button>
        </template>
      </van-time-picker>
      <div>{{ value }}</div>
      <div>{{ startValue }}</div>
      <div>{{ endValue }}</div>
    `,
  }),
  args: {
    unit: null,
    // minTime: '07:40:00',
    // maxTime: '10:20:00',
    showToolbar: true,
    isRange: true,
    closeOnClickOverlay: true,
    showFormatter: 'HH时mm分ss秒',
  },
};
