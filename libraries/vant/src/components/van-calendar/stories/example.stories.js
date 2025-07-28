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
        onConfirm: (event) => {
          console.log('onConfirm===', event);
        },
        onSelect: (event) => {
          console.log('onSelect===', event);
        },
        onOpen: (event) => {
          console.log('onOpen===', event);
        },
        onClose: (event) => {
          console.log('onClose===', event);
        },
      };
    },
    data() {
      return {
        value: '2025-07-20',
      };
    },
    template: `
      <van-calendar v-bind="args" @confirm="onConfirm" @select="onSelect" v-model:modelValue="value" @open="onOpen" @close="onClose" >
        <template #label>
          <span>选择日期</span>
        </template>
        <template #subtitle>
          <span>副标题</span>
        </template>
      </van-calendar>
      {{ value }}
    `,
  }),
  args: {
    type: 'multiple',
    switchMode: 'month',
    show: true,
    minDate: '2025-06-10',
    maxDate: '2025-07-31',
    maxRange: 3,
  },
};
