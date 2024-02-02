import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';
import ExamplesDemo3 from '../demos/examples/ExamplesDemo3.vue';
import ExamplesDemo4 from '../demos/examples/ExamplesDemo4.vue';
import ExamplesDemo5 from '../demos/examples/ExamplesDemo5.vue';
import ExamplesDemo6 from '../demos/examples/ExamplesDemo6.vue';
import ExamplesDemo7 from '../demos/examples/ExamplesDemo7.vue';
import ExamplesDemo8 from '../demos/examples/ExamplesDemo8.vue';
import ExamplesDemo9 from '../demos/examples/ExamplesDemo9.vue';
import ExamplesDemo10 from '../demos/examples/ExamplesDemo10.vue';
import ExamplesDemo11 from '../demos/examples/ExamplesDemo11.vue';
import ExamplesDemo12 from '../demos/examples/ExamplesDemo12.vue';
import ExamplesDemo13 from '../demos/examples/ExamplesDemo13.vue';
import ExamplesDemo14 from '../demos/examples/ExamplesDemo14.vue';
import ExamplesDemo15 from '../demos/examples/ExamplesDemo15.vue';
import ExamplesDemo16 from '../demos/examples/ExamplesDemo16.vue';
import ExamplesDemo17 from '../demos/examples/ExamplesDemo17.vue';
import ExamplesDemo18 from '../demos/examples/ExamplesDemo18.vue';
import ExamplesDemo19 from '../demos/examples/ExamplesDemo19.vue';
import ExamplesDemo20 from '../demos/examples/ExamplesDemo20.vue';
import ExamplesDemo21 from '../demos/examples/ExamplesDemo21.vue';
import ExamplesDemo22 from '../demos/examples/ExamplesDemo22.vue';
import ExamplesDemo23 from '../demos/examples/ExamplesDemo23.vue';
import ExamplesDemo24 from '../demos/examples/ExamplesDemo24.vue';
import ExamplesDemo25 from '../demos/examples/ExamplesDemo25.vue';
import ExamplesDemo26 from '../demos/examples/ExamplesDemo26.vue';
import ExamplesDemo27 from '../demos/examples/ExamplesDemo27.vue';
import ExamplesDemo28 from '../demos/examples/ExamplesDemo28.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-select.vue/examples',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Demo0 = {
  name: 'tag 方式',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  name: 'data-source 数组',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: 'data-source 函数',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '指定选项字段名',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  name: '禁用状态、禁用某一项',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  name: '为空禁用',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  name: 'autofocus',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  name: '分隔符',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  name: '分组',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo9,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo9 = {
  name: '可清除',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo10,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo10 = {
  name: '多项选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo11,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo11 = {
  name: '多项选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo12,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo12 = {
  name: '多项选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo13,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo13 = {
  name: '多项选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo14,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo14 = {
  name: 'Tags 风格',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo15,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo15 = {
  name: '可以重复',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo16,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo16 = {
  name: 'Flag',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo17,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo17 = {
  name: 'Label',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo18,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo18 = {
  name: '修改尺寸',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo19,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo19 = {
  name: '前端过滤（搜索）',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo20,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo20 = {
  name: '匹配方式',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo21,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo21 = {
  name: '区分大小写',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo22,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo22 = {
  name: '后端过滤（搜索）',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo23,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo23 = {
  name: '自动补充',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo24,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo24 = {
  name: '前端加载更多',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo25,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo25 = {
  name: '后端加载更多',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo26,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo26 = {
  name: '前缀方式',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo27,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo27 = {
  name: '自定义可扩展下拉项',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo28,
    },
    template: '<deprecated-demo />',
  }),
};
