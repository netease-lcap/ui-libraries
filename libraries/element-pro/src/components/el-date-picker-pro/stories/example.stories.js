import ElDatePickerPro from '../index';

export default {
  id: 'el-date-picker-pro-examples',
  title: '组件列表/DatePicker 日期选择器/示例',
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
    template: '<el-date-picker-pro align="center" style="--el-datepicker-cell-active-background: red;" :enablePresets="true" presetsPlacement="left" :allowInput="true" :value.sync="value" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-picker-pro>',
  }),
};

export const Range = {
  name: '区间选择示例',
  render: () => ({
    data() {
      return {
        startValue: '2024-08-02',
        endValue: '2024-10-02',
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
    template: '<el-date-picker-pro :enablePresets="true" align="center" :allowInput="true"  presetsPlacement="left" :range="true" :startValue.sync="startValue" :endValue.sync="endValue" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-picker-pro>',
  }),
};
