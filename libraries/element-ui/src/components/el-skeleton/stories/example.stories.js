import Component from '../index';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';
import ExampleDemo7 from '../demos/example-demo7.vue';

export default {
  id: 'el-skeleton-examples',
  title: '组件列表/SKELETON 骨架屏/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的骨架效果。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<div>
  <el-skeleton />
</div>`,
  }),
};

/*  可以配置骨架屏段落数量，以便更接近真实渲染效果。首行会被渲染一个长度 33% 的段首。 */
export const Example2 = {
  name: '更多参数',
  render: () => ({
    template: '<div><el-skeleton :rows="6" /></div>',
  }),
};

/*  显示动画效果。 */
export const Example3 = {
  name: '动画效果',
  render: () => ({
    template: '<div><el-skeleton :rows="6" animated /></div>',
  }),
};

/*  Element 提供的排版模式有时候并不满足要求，当您想要用自己定义的模板时，可以通过一个具名 Slot 来自己设定模板。 我们提供了不同的模板单元可供使用，具体可选值请看 API 详细描述。 建议在描述模板的时候，尽量靠近真实的 DOM 结构，这样可以避免 DOM 高度差距引起的抖动。 :::demo */
export const Example4 = {
  name: '自定义样式',
  render: () => ({
    template: `<div>
  <el-skeleton style="width: 240px">
    <template slot="template">
      <el-skeleton-item variant="image" style="width: 240px; height: 240px;" />
      <div style="padding: 14px;">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div
          style="display: flex; align-items: center; justify-items: space-between;"
        >
          <el-skeleton-item variant="text" style="margin-right: 16px;" />
          <el-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </div>
    </template>
  </el-skeleton>
</div>`,
  }),
};

/*  当 Loading 结束之后，我们往往需要显示真实的 UI，可以通过 `loading` 的值来控制是否显示真实的 DOM。然后通过 具名 Slot 来设置当 loading 结束之后需要展示的 UI。 */
export const Example5 = {
  name: 'Loading 状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。利用 `count` 这个属性就能控制渲染多少条假的数据在页面上 */
export const Example6 = {
  name: '渲染多条数据',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  有的时候，API 的请求回来的特别快，往往骨架占位刚刚被渲染，真实的数据就已经回来了，用户的界面会突然一闪，此时为了避免这种情况，就需要通过 `throttle` 属性来避免这个问题。 */
export const Example7 = {
  name: '防止渲染抖动',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};
