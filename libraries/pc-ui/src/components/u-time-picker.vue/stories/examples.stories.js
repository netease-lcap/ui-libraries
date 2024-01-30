import Vue from 'vue';
import VueI18N from 'vue-i18n';
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

Vue.use(VueI18N);
Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-time-picker.vue/examples',
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
  name: '隐藏底部按钮',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '自定义底部文案',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '只读和禁用',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  name: '日期范围',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  name: '日期最小单位',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  name: '方法',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  name: '范围选择',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  name: '范围选择分钟',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo9,
    },
    template: '<deprecated-demo />',
  }),
};
