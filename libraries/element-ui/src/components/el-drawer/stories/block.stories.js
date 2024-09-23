import ElDrawer from '../index';

export default {
  id: 'el-drawer-blocks',
  title: '组件列表/DRAWER 抽屉/内置区块',
  component: ElDrawer,
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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-drawer></el-drawer>',
  }),
};
