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
    data() {
      return {
        value: '2025/07/24 12:00:00',
        startValue: '2025/07/24',
        endValue: '2025/07/25',
        startTimeValue: '12:00',
        endTimeValue: '13:00',
      };
    },
    template: `
      <van-date-picker v-bind="args" v-model:modelValue="value">
        <template #label>
          <div>选择日期</div>
        </template>
        <template #title>
          <div>选择日期</div>
        </template>
      </van-date-picker>
      {{ value }}
    `,
  }),
  args: {
    // columnsType: ['year', 'month', 'day'],
    isRange: true,
    type: 'date',
    converter: 'timestamp',
    unit: 'hour',
  },
};
