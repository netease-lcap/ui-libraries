import ElTreeSelectPro from '../index';

export default {
  id: 'el-tree-select-pro-examples',
  title: '组件列表/TreeSelect 树选择/示例',
  component: ElTreeSelectPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-tree-select-pro></el-tree-select-pro>',
  }),
};
