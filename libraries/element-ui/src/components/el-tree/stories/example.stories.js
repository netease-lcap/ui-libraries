import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';
import ExampleDemo7 from '../demos/example-demo7.vue';
import ExampleDemo8 from '../demos/example-demo8.vue';
import ExampleDemo9 from '../demos/example-demo9.vue';
import ExampleDemo10 from '../demos/example-demo10.vue';

export default {
  id: 'el-tree-examples',
  title: '组件列表/TREE 树形控件/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的树形结构展示。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  适用于需要选择层级时使用。 */
export const Example2 = {
  name: '可选择',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example3 = {
  name: '懒加载自定义叶子节点',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可将 Tree 的某些节点设置为默认展开或默认选中 */
export const Example4 = {
  name: '默认展开和默认选中',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可将 Tree 的某些节点设置为禁用状态 */
export const Example5 = {
  name: '禁用状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example6 = {
  name: '树节点的选择',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  节点的内容支持自定义，可以在节点区添加按钮或图标等内容 */
export const Example7 = {
  name: '自定义节点内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过关键字过滤树节点 */
export const Example8 = {
  name: '节点过滤',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  对于同一级的节点，每次只能展开一个 */
export const Example9 = {
  name: '手风琴模式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过 draggable 属性可让节点变为可拖拽。 */
export const Example10 = {
  name: '可拖拽节点',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo10,
    },
    template: '<example-demo></example-demo>',
  }),
};
