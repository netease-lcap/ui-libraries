import VanSignature from '../index';

export default {
  id: 'van-signature-blocks',
  title: '组件列表/Signature 签名/内置区块',
  component: VanSignature,
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
    template: '<van-signature />',
  }),
};
