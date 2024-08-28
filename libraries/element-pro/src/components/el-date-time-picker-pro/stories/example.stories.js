import ElDatePickerPro from '../index';

export default {
  id: 'el-date-time-picker-pro-examples',
  title: '组件列表/DateTimePicker 日期选择器/示例',
  component: ElDatePickerPro,
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
        value: '2024-08-02',
      };
    },
    methods: {
      handleChange(name, e) {
        console.log(name, e);
      },
      handleSyncState(name, value) {
        console.log('sync', name, value);
      },
    },
    template: '<el-date-time-picker-pro :autoWidth="true" align="center" :enablePresets="true" presetsPlacement="left" :allowInput="true" :value.sync="value" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-time-picker-pro>',
  }),
};

export const Range = {
  name: '区间选择示例',
  render: () => ({
    data() {
      return {
        startDate: '2024-08-02',
        endDate: '2024-10-02',
      };
    },
    methods: {
      handleChange(name, e) {
        console.log(name, e);
      },
      handleSyncState(name, value) {
        console.log('sync', name, value);
      },
    },
    template: '<el-date-time-picker-pro time-format="HH:mm" :enablePresets="true" align="center" :allowInput="true"  presetsPlacement="left" :range="true" :startDate.sync="startDate" :endDate.sync="endDate" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-time-picker-pro>',
  }),
};
