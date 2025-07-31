import VanPopup from '../index';

export default {
  id: 'van-popup-blocks',
  title: '组件列表/Popup 弹出层/内置区块',
  component: VanPopup,
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
    template: '<van-popup style="padding: 64px;"><template #default><van-text text="内容"></van-text></template><template #overlay-content><van-text text="遮罩层内容"></van-text></template></van-popup>',
  }),
};
