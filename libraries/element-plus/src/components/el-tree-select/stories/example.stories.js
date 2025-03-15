import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-tree-select-examples',
  title: '组件列表/TreeSelect 树形选择/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础用法 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const value = ref('');
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];
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
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps, dataSource };
    },
    template: `
    <div>
      <el-tree-select
      :multiple="true" :placeholder="12" valueField="entity1.id"
        textField="entity1.property1"
        parentField="entity1.fid" v-model:value="activeName" :dataSource="dataSource"
        node-key="value"
        placeholder="请选择"
        style="width: 240px"
      />
    </div>
    `,
  }),
};

/* 多选 */
export const Example2 = {
  name: '多选',
  render: () => ({
    setup() {
      const value = ref([]);
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps };
    },
    template: `
    <div>
      <el-tree-select
        v-model="value"
        :data="data"
        :props="defaultProps"
        :render-after-expand="false"
        node-key="value"
        multiple
        placeholder="请选择"
        style="width: 240px"
      />
    </div>
    `,
  }),
};

/* 显示复选框 */
export const Example3 = {
  name: '显示复选框',
  render: () => ({
    setup() {
      const value = ref([]);
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps };
    },
    template: `
    <div>
      <el-tree-select
        v-model="value"
        :data="data"
        :props="defaultProps"
        :render-after-expand="false"
        node-key="value"
        show-checkbox
        multiple
        placeholder="请选择"
        style="width: 240px"
      />
    </div>
    `,
  }),
};
