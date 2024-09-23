import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';

export default {
  id: 'el-tooltip-examples',
  title: '组件列表/TOOLTIP 文字提示/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  Tooltip 组件提供了两个不同的主题：`dark`和`light`。 */
export const Example2 = {
  name: '主题',
  render: () => ({
    template: `<div><el-tooltip content="Top center" placement="top">
  <el-button>Dark</el-button>
</el-tooltip>
<el-tooltip content="Bottom center" placement="bottom" effect="light">
  <el-button>Light</el-button>
</el-tooltip></div>`,
  }),
};

/*  展示多行文本或者是设置文本内容的格式 */
export const Example3 = {
  name: '更多 Content',
  render: () => ({
    template: `<div><el-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <el-button>Top center</el-button>
</el-tooltip></div>`,
  }),
};

/*  除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果： `transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。 如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。 事实上，这是基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，你可以自定义任意 Vue-popper 中允许定义的字段。 当然 Tooltip 组件实际上十分强大，文末的API文档会做一一说明。 */
export const Example4 = {
  name: '高级扩展',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};
