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
  id: 'el-dialog-examples',
  title: '组件列表/Dialog 对话框/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  Dialog 弹出一个对话框，适合需要定制性更大的场景。 */
export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Element Plus 的表格和表单。 */
export const Example2 = {
  name: '自定义内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  header 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 title 属性，或使用 titleId 插槽属性来指定哪些元素应该读取为对话框标题。 */
export const Example3 = {
  name: '自定义头部',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。
:::demo 正常情况下，我们不建议使用嵌套的 Dialog，如果需要在页面上同时显示多个 Dialog，可以将它们平级放置。
对于确实需要嵌套 Dialog 的场景，我们提供了`append-to-body`属性。将内层 Dialog 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Dialog 和遮罩层级关系的正确。 */
export const Example4 = {
  name: '嵌套的 Dialog',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  对话框的内容可以居中。 */
export const Example5 = {
  name: '内容居中',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  从屏幕中心打开对话框。 */
export const Example6 = {
  name: '居中对话框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example7 = {
  name: '关闭时销毁',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  试着拖动一下header部分吧 */
export const Example8 = {
  name: '可拖拽对话框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  设置 fullscreen 属性来打开全屏对话框。 */
export const Example9 = {
  name: '全屏',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  将 modal 设置为 false 会隐藏对话框的模态（覆盖层）。 */
export const Example10 = {
  name: '模态框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo10,
    },
    template: '<example-demo></example-demo>',
  }),
};
