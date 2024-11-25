import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import ExamplesDemo1 from '../demos/index.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-popup-combination.vue/examples',
  component: Component,
  parameters: {
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Demo0 = {
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};
