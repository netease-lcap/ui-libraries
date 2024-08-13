import ElAlert from '../index';

export default {
  id: 'el-alert-blocks',
  title: '组件列表/ALERT 警告/内置区块',
  component: ElAlert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
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
    template: '<el-alert type="info"><template #title><el-text text="公告内容"></u-text></template></el-alert>',
  }),
};
