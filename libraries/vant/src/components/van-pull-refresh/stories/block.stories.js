import VanPullRefresh from '../index';

export default {
  id: 'van-pull-refresh-blocks',
  title: '组件列表/PullRefresh 下拉刷新/内置区块',
  component: VanPullRefresh,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 100%;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<van-pull-refresh style="min-height: 100vh;"><van-text text="下拉刷新" /></van-pull-refresh>',
  }),
};
