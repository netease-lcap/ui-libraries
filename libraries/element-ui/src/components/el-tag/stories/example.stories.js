import Component from '../index';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';

export default {
  id: 'el-tag-examples',
  title: '组件列表/TAG 标签/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<div><el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag></div>`,
  }),
};

/*  */
export const Example2 = {
  name: '可移除标签',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现 */
export const Example3 = {
  name: '动态编辑标签',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。 */
export const Example4 = {
  name: '不同尺寸',
  render: () => ({
    template: `<div><el-tag closable>默认标签</el-tag>
<el-tag size="medium" closable>中等标签</el-tag>
<el-tag size="small" closable>小型标签</el-tag>
<el-tag size="mini" closable>超小标签</el-tag></div>`,
  }),
};

/*  Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain` */
export const Example5 = {
  name: '不同主题',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};
