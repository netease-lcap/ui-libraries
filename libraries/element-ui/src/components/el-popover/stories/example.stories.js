import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';

export default {
  id: 'el-popover-examples',
  title: '组件列表/POPOVER 弹出框/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  Popover 的属性与 Tooltip 很类似，它们都是基于`Vue-popper`开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。 */
export const Example2 = {
  name: '嵌套信息',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  当然，你还可以嵌套操作，这相比 Dialog 更为轻量： */
export const Example3 = {
  name: '嵌套操作',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};
