import ElTagInputPro from '../index';

export default {
  id: 'el-tag-input-pro-examples',
  title: '组件列表/TagInput 标签输入框/示例',
  component: ElTagInputPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-tag-input-pro></el-tag-input-pro>',
  }),
};
