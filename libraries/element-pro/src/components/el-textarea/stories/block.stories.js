import ElTextareaPro from '../index';

export default {
  id: 'el-textarea-pro-blocks',
  title: '组件列表/Textarea 多行文本框/内置区块',
  component: ElTextareaPro,
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
    template: '<el-textarea-pro></el-textarea-pro>',
  }),
};
