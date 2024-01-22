import Vue from 'vue';
import '__demo-entry__';
import DefaultDemo from '../demos/index.vue';
import Component from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/swipe',
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

export const Default = {
  render: () => ({
    components: {
      DefaultDemo,
    },
    template: '<default-demo class="demo-swipe" />',
  }),
};
