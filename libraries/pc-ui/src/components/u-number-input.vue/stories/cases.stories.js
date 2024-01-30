import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import CasesDemo1 from '../demos/cases/CasesDemo1.vue';
import CasesDemo2 from '../demos/cases/CasesDemo2.vue';
import CasesDemo3 from '../demos/cases/CasesDemo3.vue';
import CasesDemo4 from '../demos/cases/CasesDemo4.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-number-input.vue/cases',
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
      DeprecatedDemo: CasesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  name: '键盘事件',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '单位展示',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '高级格式化',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};
