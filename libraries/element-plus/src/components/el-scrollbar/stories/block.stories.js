import ElScrollbar from '../index';

export default {
  id: 'el-scrollbar-blocks',
  title: '组件列表/scrollbar 滚动条/内置区块',
  component: ElScrollbar,
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
  name: '基础示例',
  render: () => ({
    template: '<el-scrollbar height="400px"></el-scrollbar>',
  }),
};
