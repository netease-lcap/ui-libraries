import VanActionSheet from '../index';

export default {
  id: 'van-action-sheet-blocks',
  title: '组件列表/ActionSheet 动作面板/内置区块',
  component: VanActionSheet,
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
    template: '<van-action-sheet />',
  }),
};
