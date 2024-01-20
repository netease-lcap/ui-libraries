import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import CasesDemo1 from '../demos/cases/CasesDemo1.vue';
import CasesDemo2 from '../demos/cases/CasesDemo2.vue';
import CasesDemo3 from '../demos/cases/CasesDemo3.vue';
import CasesDemo4 from '../demos/cases/CasesDemo4.vue';
import CasesDemo5 from '../demos/cases/CasesDemo5.vue';
import CasesDemo6 from '../demos/cases/CasesDemo6.vue';
import CasesDemo7 from '../demos/cases/CasesDemo7.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/m-multiplex.vue/cases',
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
      DeprecatedDemo: CasesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};
