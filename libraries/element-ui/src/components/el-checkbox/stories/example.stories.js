import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';
import ExampleDemo7 from '../demos/example-demo7.vue';

export default {
  id: 'el-checkbox-examples',
  title: '组件列表/CHECKBOX 多选框/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  多选框不可用状态。 */
export const Example2 = {
  name: '禁用状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。 */
export const Example3 = {
  name: '多选框组',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  `indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果 */
export const Example4 = {
  name: 'indeterminate 状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。 */
export const Example5 = {
  name: '可选项目数量的限制',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  按钮样式的多选组合。 */
export const Example6 = {
  name: '按钮样式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example7 = {
  name: '带有边框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};
