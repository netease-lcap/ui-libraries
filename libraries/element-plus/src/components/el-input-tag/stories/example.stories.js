import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-input-tag-examples',
  title: '组件列表/Input Tag 标签输入框/示例',
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
      const input = ref();
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" placeholder="请输入内容后按回车键" />
    </div>
    `,
  }),
};

/* 自定义触发键 */
export const Example2 = {
  name: '自定义触发键',
  render: () => ({
    setup() {
      const input = ref();
      const trigger = ref('Space');
      return { input, trigger };
    },
    template: `
    <div>
      <div class="mb-4">
        <label>
          <input type="radio" v-model="trigger" value="Enter" /> 回车键
        </label>
        <label class="ml-4">
          <input type="radio" v-model="trigger" value="Space" /> 空格键
        </label>
      </div>
      <el-input-tag v-model="input" :trigger="trigger" placeholder="请输入内容后按所选键" />
    </div>
    <style>
      .mb-4 {
        margin-bottom: 16px;
      }
      .ml-4 {
        margin-left: 16px;
      }
    </style>
    `,
  }),
};

/* 最大标签数 */
export const Example3 = {
  name: '最大标签数',
  render: () => ({
    setup() {
      const input = ref();
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" :max="3" placeholder="最多添加 3 个标签" />
    </div>
    `,
  }),
};

/* 禁用状态 */
export const Example4 = {
  name: '禁用状态',
  render: () => ({
    setup() {
      const input = ref(['标签1', '标签2', '标签3']);
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" disabled placeholder="请输入内容" />
    </div>
    `,
  }),
};

/* 可清空 */
export const Example5 = {
  name: '可清空',
  render: () => ({
    setup() {
      const input = ref(['标签1', '标签2', '标签3']);
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" clearable placeholder="请输入内容" />
    </div>
    `,
  }),
};

/* 可拖拽 */
export const Example6 = {
  name: '可拖拽',
  render: () => ({
    setup() {
      const input = ref(['标签1', '标签2', '标签3']);
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" draggable placeholder="请输入内容" />
    </div>
    `,
  }),
};

/* 尺寸 */
export const Example7 = {
  name: '尺寸',
  render: () => ({
    setup() {
      const input = ref();
      return { input };
    },
    template: `
    <div>
      <div class="mb-4">
        <el-input-tag v-model="input" size="large" placeholder="大尺寸" />
      </div>
      <div class="mb-4">
        <el-input-tag v-model="input" placeholder="默认尺寸" />
      </div>
      <div>
        <el-input-tag v-model="input" size="small" placeholder="小尺寸" />
      </div>
    </div>
    <style>
      .mb-4 {
        margin-bottom: 16px;
      }
    </style>
    `,
  }),
};
