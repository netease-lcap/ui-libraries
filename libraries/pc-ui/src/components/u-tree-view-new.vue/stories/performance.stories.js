import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import dataSource from '../demos/examples/data';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-tree-view-new.vue/性能',
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

export const Demo1 = {
  name: '大数据渲染',
  render: () => ({
    data() {
      return {
        data: dataSource,
        values: [],
      };
    },
    template: `
      <u-linear-layout direction="vertical">
        <u-tree-view-new ref="treeView"  :renderOptimize="true" :value.sync="values" checkable :data-source="data" text-field="department.name" value-field="department.deptId" parent-field="department.parentDeptId"></u-tree-view-new>
        {{ values }}
      </u-linear-layout>
    `,
  }),
};
