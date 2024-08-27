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
    methods: {
      handleSyncState(name, value) {
        console.log(name, value);
      },
    },
    template: '<el-time-picker-pro format="HH时mm分ss秒" :clearable="true" :range="true" @sync:state="handleSyncState"></el-time-picker-pro>',
  }),
};
