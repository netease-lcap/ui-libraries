import ElTree from '../index';
import SingleDemo from '../demos/single.vue';
import multipleDemo from '../demos/multiple.vue';

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
    setup() {
      const dataSource = () => new Promise((res) => {
          setTimeout(() => {
            res([
              {
                entity1: {
                  id: 0,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项5',
                  fid: 1,
                },
              },
              {
                entity1: {
                  id: 1,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项6',
                  fid: 2,
                },
              },
              {
                entity1: {
                  id: 3,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项3',
                  fid: 0,
                },
              },
              {
                entity1: {
                  id: 7,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项2',
                  fid: 1,
                },
              },
              {
                entity1: {
                  id: 8,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项1.1',
                  fid: 2,
                },
              },
              {
                entity1: {
                  id: 9,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '选项4',
                  fid: 0,
                },
              },
            ]);
          }, 1000);
        });
      const list = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            const options = Array.from({ length: 1000 }).map((_, idx) => ({
              value: `Option ${idx + 1}`,
              label: `${initials[idx % 10]}${idx}`,
            }));
            res(options);
          }, 1000);
        });
      };
      return {
        dataSource,
        list,
      };
    },
    template: '<el-tree :height="208" :virtualize="true" :default-checked-keys="[1]" show-checkbox  :dataSource="list"></el-tree>',
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
