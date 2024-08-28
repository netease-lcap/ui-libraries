import ElTimePickerPro from '../index';

export default {
  id: 'el-time-picker-pro-examples',
  title: '组件列表/TimePicker 时间选择器/示例',
  component: ElTimePickerPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    data() {
      return {
        align: 'left'
      }
    },
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
      handleChange() {
        this.align = 'center';
      },
    },
    template: '<el-time-picker-pro :inputAlign="align" :inputAutoWidth="true" format="HH时mm分ss秒" :clearable="true" @change="handleChange" @sync:state="handleSyncState"></el-time-picker-pro>',
  }),
};

export const Range = {
  name: '区间选择',
  render: () => ({
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
    },
    template: '<el-time-picker-pro inputAlign="center" :inputAutoWidth="true"  :readonly="true" format="HH时mm分ss秒" :clearable="true" :range="true" @sync:state="handleSyncState"></el-time-picker-pro>',
  }),
};
