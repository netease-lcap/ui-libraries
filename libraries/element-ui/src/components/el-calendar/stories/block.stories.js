import ElCalendar from '../index';

export default {
  id: 'el-calendar-blocks',
  title: '组件列表/CALENDAR 日历/内置区块',
  component: ElCalendar,
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
      template: '<div style="width: 800px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-calendar></el-calendar>',
  }),
};
