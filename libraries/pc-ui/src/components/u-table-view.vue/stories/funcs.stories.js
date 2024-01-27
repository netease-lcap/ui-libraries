import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import ExportExcel from '../demos/examples/ExportExcel.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-table-view.vue/功能演示',
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

export const 导出表格 = {
  render: () => ({
    components: {
      ExportExcel,
    },
    template: '<ExportExcel />',
  }),
};
