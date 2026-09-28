import VanNoticeBar from '../index';

export default {
  id: 'van-notice-bar-blocks',
  title: '组件列表/NoticeBar 通知栏/内置区块',
  component: VanNoticeBar,
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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<van-notice-bar><template #default><van-text text="米袋虽空——樱花开哉！"></van-text></template></van-notice-bar>',
  }),
};
