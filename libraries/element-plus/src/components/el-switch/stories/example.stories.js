import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-switch-examples',
  title: '组件列表/Switch 开关/示例',
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
      const value = ref(true);
      return { value };
    },
    template: `
    <div>
      <el-switch v-model="value" />
    </div>
    `,
  }),
};

/* 禁用状态 */
export const Example2 = {
  name: '禁用状态',
  render: () => ({
    setup() {
      const value = ref(true);
      return { value };
    },
    template: `
    <div>
      <el-switch v-model="value" disabled />
    </div>
    `,
  }),
};

/* 文字描述 */
export const Example3 = {
  name: '文字描述',
  render: () => ({
    setup() {
      const value = ref(true);
      return { value };
    },
    template: `
    <div>
      <el-switch
        v-model="value"
        active-text="打开"
        inactive-text="关闭"
      />
    </div>
    `,
  }),
};

/* 显示自定义图标 */
export const Example4 = {
  name: '显示自定义图标',
  render: () => ({
    setup() {
      const value = ref(true);
      return { value };
    },
    template: `
    <div>
      <el-switch
        v-model="value"
        active-icon="Check"
        inactive-icon="Close"
      />
    </div>
    `,
  }),
};

/* 扩展的值类型 */
export const Example5 = {
  name: '扩展的值类型',
  render: () => ({
    setup() {
      const value = ref('100');
      return { value };
    },
    template: `
    <div>
      <el-switch
        v-model="value"
        active-value="100"
        inactive-value="0"
      />
    </div>
    `,
  }),
}; 