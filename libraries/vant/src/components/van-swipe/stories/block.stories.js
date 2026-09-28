import VanSwipe from '../index';

export default {
  id: 'van-swipe-blocks',
  title: '组件列表/Swipe 轮播/内置区块',
  component: VanSwipe,
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
    template: `
    <van-swipe :autoplay="3000">
      <van-swipe-item>
        <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" :isCustomDefault="false" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" :isCustomDefault="false" />
      </van-swipe-item>
    </van-swipe>`,
  }),
};
