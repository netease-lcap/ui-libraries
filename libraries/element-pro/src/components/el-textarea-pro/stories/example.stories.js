import ElTextareaPro from '../index';

export default {
  id: 'el-textarea-pro-examples',
  title: '组件列表/Textarea 多行文本框/示例',
  component: ElTextareaPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-textarea-pro></el-textarea-pro>',
  }),
};
