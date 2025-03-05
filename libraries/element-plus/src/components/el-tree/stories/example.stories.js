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
    data() {
      return {
        dataSource: [
          {
            label: '一级节点 1',
            children: [
              {
                label: '二级节点 1-1',
                children: [
                  { label: '三级节点 1-1-1' },
                  { label: '三级节点 1-1-2' },
                ],
              },
              {
                label: '二级节点 1-2',
                children: [
                  { label: '三级节点 1-2-1' },
                  { label: '三级节点 1-2-2' },
                ],
              },
            ],
          },
          {
            label: '一级节点 2',
            children: [
              {
                label: '二级节点 2-1',
                children: [
                  { label: '三级节点 2-1-1' },
                  { label: '三级节点 2-1-2' },
                ],
              },
            ],
          },
          {
            label: '一级节点 3',
            children: [
              { label: '二级节点 3-1' },
              { label: '二级节点 3-2' },
            ],
          },
        ],
      };
    },
    template: '<el-tree valueField="label" childrenField="children" textField="label" :dataSource="dataSource"></el-tree>',
  }),
};
