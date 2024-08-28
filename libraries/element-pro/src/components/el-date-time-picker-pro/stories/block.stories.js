import ElDateTimePickerPro from '../index';

export default {
  id: 'el-date-time-picker-pro-blocks',
  title: '组件列表/DateTimePicker 日期选择器/内置区块',
  component: ElDateTimePickerPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-date-time-picker-pro></el-date-time-picker-pro>',
  }),
};
