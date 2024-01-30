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

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-date-picker.vue/examples',
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
  name: '基本用法',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  name: '自动对焦',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '弹窗对其方式',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '最大值和最小值',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  name: '只读和禁用',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  name: '方法',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  name: '周选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  name: '月份选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  name: '季度选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo9,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo9 = {
  name: '年份选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo10,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo10 = {
  name: '日期范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo11,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo11 = {
  name: '周范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo12,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo12 = {
  name: '月份范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo13,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo13 = {
  name: '季度范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo14,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo14 = {
  name: '年度范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo15,
    },
    template: '<deprecated-demo />',
  }),
};
