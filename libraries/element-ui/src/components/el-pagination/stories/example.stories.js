import Component from '../index';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';

export default {
  id: 'el-pagination-examples',
  title: '组件列表/PAGINATION 分页/示例',
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
    template: `<div><div class="block">
  <span class="demonstration">页数较少时的效果</span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
<div class="block">
  <span class="demonstration">大于 7 页时的效果</span>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div></div>`,
  }),
};

/*  */
export const Example2 = {
  name: '设置最大页码按钮数',
  render: () => ({
    template: `<div><el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination></div>`,
  }),
};

/*  */
export const Example3 = {
  name: '带有背景色的分页',
  render: () => ({
    template: `<div><el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination></div>`,
  }),
};

/*  在空间有限的情况下，可以使用简单的小型分页。 */
export const Example4 = {
  name: '小型分页',
  render: () => ({
    template: `<div><el-pagination
  small
  layout="prev, pager, next"
  :total="50">
</el-pagination></div>`,
  }),
};

/*  根据场景需要，可以添加其他功能模块。 */
export const Example5 = {
  name: '附加功能',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。 */
export const Example6 = {
  name: '当只有一页时隐藏分页',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};
