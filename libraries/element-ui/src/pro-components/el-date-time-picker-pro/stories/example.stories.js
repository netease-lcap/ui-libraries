import ElDatePickerPro from '../index';

export default {
  id: 'el-date-time-picker-pro-examples',
  title: 'Pro组件列表/DateTimePicker 日期选择器/示例',
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
        value: '2025-04-31',
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
    template: '<el-date-time-picker-pro style="width: 260px"  :style="{ height: height }" :class="`el-text`" class="el-temp" @confirm="confirm" min-date="2025-04-22 10:38:39" :value.sync="value" @sync:state="handleSyncState" @change="handleChange(`change`, $event)" @focus="handleChange(`focus`, $event)" @pick="handleChange(`pick`, $event)"></el-date-time-picker-pro>',
  }),
};

export const Range = {
  name: '区间选择示例',
  render: () => ({
    data() {
      return {
        startValue: null,
        endValue: null,
        values: '2025-04-22 10:38:39',
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
    template: `
      <div>
        <el-date-time-picker-pro min-date="2025-04-22 10:38:39" time-format="HH:mm"   @confirm="confirm" :enablePresets="true" align="center" :allowInput="true"  presetsPlacement="left" :range="true" :startValue.sync="startValue" :endValue.sync="endValue" :value.sync="values" @sync:state="handleSyncState" @change="handleChange('change', $event)" @focus="handleChange('focus', $event)" @pick="handleChange('pick', $event)"></el-date-time-picker-pro>
        <p>startValue: {{ startValue }}</p>
        <p>endValue: {{ endValue }}</p>
        <p>values: {{ values }}</p>
      </div>
    `,
  }),
};
