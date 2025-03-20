import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-input-number-examples',
  title: '组件列表/Input Number 数字输入框/示例',
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
      const num = ref(1);
      const handleChange = (value) => {
        console.log(value);
      };
      return { num, handleChange };
    },
    template: `
    <div>
      <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
    </div>
    `,
  }),
};

/* 禁用状态 */
export const Example2 = {
  name: '禁用状态',
  render: () => ({
    setup() {
      const num = ref(1);
      return { num };
    },
    template: `
    <div>
      <el-input-number v-model="num" disabled />
    </div>
    `,
  }),
};

/* 步长 */
export const Example3 = {
  name: '步长',
  render: () => ({
    setup() {
      const num = ref(5);
      return { num };
    },
    template: `
    <div>
      <el-input-number v-model="num" :step="2" />
    </div>
    `,
  }),
};

/* 严格步长 */
export const Example4 = {
  name: '严格步长',
  render: () => ({
    setup() {
      const num = ref(2);
      return { num };
    },
    template: `
    <div>
      <el-input-number v-model="num" :step="2" step-strictly />
    </div>
    `,
  }),
};

/* 精度 */
export const Example5 = {
  name: '精度',
  render: () => ({
    setup() {
      const num = ref(1);
      return { num };
    },
    template: `
    <div>
      <el-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
    </div>
    `,
  }),
};

/* 尺寸 */
export const Example6 = {
  name: '尺寸',
  render: () => ({
    setup() {
      const num1 = ref(1);
      const num2 = ref(1);
      const num3 = ref(1);
      return { num1, num2, num3 };
    },
    template: `
    <div>
      <el-input-number v-model="num1" size="large" />
      <el-input-number v-model="num2" class="mx-4" />
      <el-input-number v-model="num3" size="small" />
    </div>
    <style>
      .mx-4 {
        margin: 0 16px;
      }
    </style>
    `,
  }),
};

/* 按钮位置 */
export const Example7 = {
  name: '按钮位置',
  render: () => ({
    setup() {
      const num = ref(1);
      const handleChange = (value) => {
        console.log(value);
      };
      return { num, handleChange };
    },
    template: `
    <div>
      <el-input-number v-model="num" controls-position="right" @change="handleChange" />
    </div>
    `,
  }),
}; 