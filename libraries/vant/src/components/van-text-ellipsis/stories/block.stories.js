import VanTextEllipsis from '../index';

export default {
  id: 'van-text-ellipsis-blocks',
  title: '组件列表/TextEllipsis 文本省略/内置区块',
  component: VanTextEllipsis,
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
    template: '<van-text-ellipsis content="慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。" />',
  }),
};
