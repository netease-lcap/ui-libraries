import VanToast from '../index';

export default {
  id: 'van-toast-blocks',
  title: '组件列表/Toast 轻提示/内置区块',
  component: VanToast,
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
    template: '<van-toast><template #message><van-text text="消息内容"></van-text></template></van-toast>',
  }),
};
