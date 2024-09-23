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
        height: '44px',
      };
    },
    methods: {
      handleChange(name, e) {
        console.log(name, e);
      },
      confirm(context) {
        console.log(context);
      },
      handleSyncState(name, value) {
        console.log('sync', name, value);
      },
    },
    template: '<el-date-time-picker-pro style="width: 260px" :style="{ height: height }" :class="`el-text`" class="el-temp" @confirm="confirm" max-date="2024-08-15 12:12:12" :value.sync="value" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-time-picker-pro>',
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
      confirm(context) {
        console.log('confirm', context);
      },
      handleSyncState(name, value) {
        console.log('sync', name, value);
      },
    },
    template: '<el-date-time-picker-pro max-date="2024-08-15 12:12:12" time-format="HH:mm"  @confirm="confirm" :enablePresets="true" align="center" :allowInput="true"  presetsPlacement="left" :range="true" :startValue.sync="startValue" :endValue.sync="endValue" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-time-picker-pro>',
  }),
};
