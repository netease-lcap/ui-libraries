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
    data() {
      return {
        data: [
          {
            label: '选项一',
            value: '1',
            children: [
              {
                label: '子选项一',
                value: '1.1',
              },
              {
                label: '子选项二',
                value: '1.2',
              },
              {
                label: '子选项三',
                value: '1.3',
              },
            ],
          },
          {
            label: '选项二',
            value: '2',
            children: [
              {
                label: '子选项一',
                value: '2.1',
              },
              {
                label: '子选项二',
                value: '2.2',
              },
            ],
          },
        ],
        list: [
          { id: 1, name: 'Node 1', parentId: null },
          { id: 2, name: 'Node 1.1', parentId: 1 },
          { id: 3, name: 'Node 1.1.1', parentId: 2 },
          { id: 4, name: 'Node 1.2', parentId: 1 },
          { id: 5, name: 'Node 2', parentId: null },
          { id: 6, name: 'Node 2.1', parentId: 5 },
        ],
      };
    },
    template: `<el-tree-select-pro
    :dataSource="list"
    parentField="parentId"
    valueField="id"
    textField="name"
    ></el-tree-select-pro>`,
  }),
};
