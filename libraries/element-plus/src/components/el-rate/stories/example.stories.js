import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-rate-examples',
  title: '组件列表/Rate 评分/示例',
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
      const value = ref(null);
      return { value };
    },
    template: `
    <div>
      <el-rate v-model="value" />
    </div>
    `,
  }),
};

/* 允许半选 */
export const Example2 = {
  name: '允许半选',
  render: () => ({
    setup() {
      const value = ref(3.5);
      return { value };
    },
    template: `
    <div>
      <el-rate v-model="value" allow-half />
    </div>
    `,
  }),
};

/* 辅助文字 */
export const Example3 = {
  name: '辅助文字',
  render: () => ({
    setup() {
      const value = ref(3);
      return { value };
    },
    template: `
    <div>
      <el-rate v-model="value" show-text />
    </div>
    `,
  }),
};

/* 自定义颜色 */
export const Example4 = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      const value = ref(2);
      const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
      return { value, colors };
    },
    template: `
    <div>
      <el-rate v-model="value" :colors="colors" />
    </div>
    `,
  }),
};

/* 只读 */
export const Example5 = {
  name: '只读',
  render: () => ({
    setup() {
      const value = ref(3.7);
      return { value };
    },
    template: `
    <div>
      <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} 分" />
    </div>
    `,
  }),
};
