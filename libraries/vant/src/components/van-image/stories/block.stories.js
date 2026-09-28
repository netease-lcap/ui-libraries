import VanImage from '../index';

export default {
  id: 'van-image-blocks',
  title: '组件列表/Image 图片/内置区块',
  component: VanImage,
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
    template: `<van-image
      width="100"
      height="100"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />`,
  }),
};
