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
      };
    },
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
    },
    template:
      `<div>
      {{startValue}} - {{endValue}}
      <div><el-time-picker-pro :allowInput="true" :startValue.sync="startValue" :endValue.sync="endValue" format="HH时mm分ss秒" :clearable="true" :range="true" @sync:state="handleSyncState"></el-time-picker-pro></div>
      </div>
      `,
  }),
};
