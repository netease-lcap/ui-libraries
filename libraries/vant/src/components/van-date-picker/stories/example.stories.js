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
        value: '2025/07/18 12:00:00',
        startValue: '2025/07/24',
        endValue: '2025/07/25',
        startTimeValue: '12:00',
        endTimeValue: '13:00',
      };
    },
    methods: {
      onClickOpen() {
        this.$refs.datepicker.open();
      },
      onChangeModelValue() {
        this.value = new Date();
      },
      onConfirm(event) {
        console.log('onConfirm', event);
      },
      onCancel(event) {
        console.log('onCancel', event);
      },
    },
    template: `
      <van-button @click="onClickOpen">打开/关闭</van-button>
      <van-button @click="onChangeModelValue">改变modelValue</van-button>
      <van-date-picker v-bind="args" v-model:modelValue="value" v-model:startValue="startValue" v-model:endValue="endValue" ref="datepicker" @confirm="onConfirm" @cancel="onCancel">
        <template #label>
          <div>选择日期</div>
        </template>
        <template #title>
          <div>选择日期</div>
        </template>
      </van-date-picker>
      {{ value }}
      {{ startValue }}
      {{ endValue }}
    `,
  }),
  args: {
    // columnsType: ['year', 'month', 'day'],
    // isRange: true,
    type: 'date',
    converter: 'timestamp',
    unit: 'hour',
    // minDate: '2025/07/24 12:00:00',
    // maxDate: '2025/07/25 12:00:00',
    popupOpened: false,
    readonly: false,
    disabled: false,
    inputAlign: 'right',
  },
};

export const FormItem = {
  name: '表单项',
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
      <van-form>
        <van-form-date-picker v-bind="args" v-model:modelValue="value" v-model:startValue="startValue" v-model:endValue="endValue">
        <template #label>
          <div>选择日期</div>
        </template>
        <template #title>
          <div>选择日期</div>
        </template>
        </van-form-date-picker>
      </van-form>
      {{ value }}
      {{ startValue }}
      {{ endValue }}
    `,
  }),
  args: {
    // columnsType: ['year', 'month', 'day'],
    isRange: true,
    type: 'date',
    converter: 'timestamp',
    unit: 'hour',
    minDate: '2025/07/24 12:00:00',
    maxDate: '2025/07/25 12:00:00',
  },
};
