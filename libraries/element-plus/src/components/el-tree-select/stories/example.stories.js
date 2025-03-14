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