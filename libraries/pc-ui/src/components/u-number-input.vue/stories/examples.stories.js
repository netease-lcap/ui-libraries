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

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-number-input.vue/examples',
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
  name: '按钮为两端分布',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '双向绑定',
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
  name: '精度与间隔',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  name: '精度与间隔',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  name: '精度与间隔',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  name: '格式化',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  name: '只读和禁用',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo9,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo9 = {
  name: '小数位数和格式化',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo10,
    },
    template: '<deprecated-demo />',
  }),
};
