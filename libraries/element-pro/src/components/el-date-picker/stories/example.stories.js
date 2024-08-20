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
    template: '<el-date-picker-pro></el-date-picker-pro>',
  }),
};
