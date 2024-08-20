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
    template: '<el-time-picker-pro></el-time-picker-pro>',
  }),
};
