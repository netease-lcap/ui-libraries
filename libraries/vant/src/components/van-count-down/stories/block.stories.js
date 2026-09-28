import VanCountDown from '../index';

export default {
  id: 'van-count-down-blocks',
  title: '组件列表/CountDown 倒计时/内置区块',
  component: VanCountDown,
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
    template: '<van-count-down />',
  }),
};
