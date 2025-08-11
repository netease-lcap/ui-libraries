import VanNotify from '../index';

export default {
  id: 'van-notify-blocks',
  title: '组件列表/Notify 消息通知/内置区块',
  component: VanNotify,
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
    template: '<van-notify><template #default><van-text text="通知内容"></van-text></template></van-notify>',
  }),
};
