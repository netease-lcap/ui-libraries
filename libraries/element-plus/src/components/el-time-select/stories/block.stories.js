import ElTimeSelect from '../index';

export default {
  id: 'el-time-select-blocks',
  title: '组件列表/time-select 时间选择/内置区块',
  component: ElTimeSelect,
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
      template: '<div style="width: 300px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '时间选择',
  render: () => ({
    template: '<el-time-select placeholder="请选择时间" />',
  }),
};
