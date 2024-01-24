import Vue from 'vue';
import '__demo-entry__';
import Component from '../index';
import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/grid-view/blocks',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Demo0 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo1,
    },
    template: '<deprecated-demo />',
  }),
};
