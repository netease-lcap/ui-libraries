import ElTreePro from '../index';
import SingleDemo from '../demos/single.vue';
import multipleDemo from '../demos/multiple.vue';

export default {
  id: 'el-tree-pro-examples',
  title: '组件列表/Tree 树/示例',
  component: ElTreePro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-tree-pro></el-tree-pro>',
  }),
};

export const Single = {
  name: '单选',
  render: () => SingleDemo,
};

export const Multiple = {
  name: '多选',
  render: () => multipleDemo,
};
