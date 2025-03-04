import { ElTree } from '../index';

export default {
  id: 'el-tree-examples',
  title: '组件列表/Tree 树/示例',
  component: ElTree,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-tree valueField="value" childrenField="children" textField="value" :dataSource="[{},{},{}]"></el-tree>',
  }),
};
