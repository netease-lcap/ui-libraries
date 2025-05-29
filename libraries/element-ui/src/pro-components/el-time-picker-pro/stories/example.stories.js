import ElTimePickerPro from '../index';

export default {
  id: 'el-time-picker-pro-examples',
  title: 'Pro组件列表/TimePicker 时间选择器/示例',
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
        align: 'left',
        value: null,
      };
    },
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
      handleChange() {
        this.align = 'center';
      },
    },
    template:
      '<div>{{value}}<el-time-picker-pro :value.sync="value" :use12Hours="true" :inputAlign="align" :inputAutoWidth="true" format="HH时mm分ss秒" :clearable="true" @change="handleChange" @sync:state="handleSyncState"></el-time-picker-pro></div>',
  }),
};

export const Range = {
  name: '区间选择',
  render: () => ({
    data() {
      return {
        startValue: null,
        endValue: null,
        values: '12:00:00',
      };
    },
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
      handleChange() {
        this.values = ['12:00:00', '19:00:00'];
      },
    },
    template:
      `<div>
      <div><el-time-picker-pro :allowInput="true" :value.sync="values" :startValue.sync="startValue" :endValue.sync="endValue" format="HH时mm分ss秒" :clearable="true" :range="true" @sync:state="handleSyncState"></el-time-picker-pro></div>
      <p>startValue: {{ startValue }}</p>
      <p>endValue: {{ endValue }}</p>
      <p>values: {{ values }}</p>
      <el-button @click="handleChange">change</el-button>
      </div>
      `,
  }),
};
