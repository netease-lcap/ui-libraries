import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import Demo from '../demos/examples/example.vue';

Vue.use(CloudUI);
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-process-graph.vue/examples',
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
  render: () => ({
    components: {
      DeprecatedDemo: Demo,
    },
    template: '<deprecated-demo />',
  }),
};
