import ElDatePicker from '../index';

export default {
  id: 'el-date-picker-blocks',
  title: '组件列表/DatePicker 日期选择器/内置区块',
  component: ElDatePicker,
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

export const Date = {
  name: '日期选择器',
  render: () => ({
    template: '<el-date-picker type="date"></el-date-picker>',
  }),
};

// export const DateTime = {
//   name: '日期时间选择器',
//   render: () => ({
//     template: '<el-date-picker type="datetime"></el-date-picker>',
//   }),
// };