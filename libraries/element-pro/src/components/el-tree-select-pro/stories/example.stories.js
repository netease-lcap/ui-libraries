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
            entityForSel: {
              id: 1,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              name: '测试1',
              fid: 0,
              disabled: false,
            },
          },
          {
            entityForSel: {
              id: 2,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              name: '测试2',
              fid: 0,
              disabled: false,
            },
          },
          {
            entityForSel: {
              id: 3,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              name: '测试1.1',
              fid: 1,
              disabled: false,
            },
          },
          {
            entityForSel: {
              id: 4,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              name: '测试1.2',
              fid: 1,
              disabled: true,
            },
          },
          {
            entityForSel: {
              id: 5,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              name: '测试2.1',
              fid: 2,
              disabled: false,
            },
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
    :dataSource="data"
    parentField="entityForSel.fid"
    valueField="entityForSel.id"
    textField="entityForSel.name"
    ></el-tree-select-pro>`,
  }),
};

export const fncall = {
  name: '函数调用',

  render: () => ({
    data() {
      return {
        data: async () => [
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
        list: async () => [
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
