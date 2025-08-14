import VanTreeSelect from '../index';

export default {
  id: 'van-tree-select-blocks',
  title: '组件列表/TreeSelect 树形选择/内置区块',
  component: VanTreeSelect,
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
    template: '<van-tree-select />',
  }),
};
