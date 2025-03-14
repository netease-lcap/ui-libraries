import Component from '../index';

export default {
  id: 'el-scrollbar-examples',
  title: '组件列表/scrollbar 滚动条/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<el-scrollbar height="400px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </el-scrollbar>`,
  }),
};

export const Example2 = {
  name: '横向滚动',
  render: () => ({
    template: `<el-scrollbar>
      <div class="scrollbar-flex-content">
        <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
    </el-scrollbar>`,
  }),
};

export const Example3 = {
  name: '最大高度',
  render: () => ({
    template: `<el-scrollbar max-height="400px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </el-scrollbar>`,
  }),
};
