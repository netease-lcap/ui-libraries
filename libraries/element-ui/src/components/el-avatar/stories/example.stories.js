import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';

export default {
  id: 'el-avatar-examples',
  title: '组件列表/AVATAR 头像/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  通过 `shape` 和 `size` 设置头像的形状和大小。 */
export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  支持三种类型：图标、图片和字符 */
export const Example2 = {
  name: '展示类型',
  render: () => ({
    template: `<div>
  <div class="demo-type">
    <div>
      <p>element icon</p>
      <el-avatar icon="user-solid"></el-avatar>
    </div>
    <div>
      <p>链接</p>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div>
      <p>字符插槽</p>
      <el-avatar> user </el-avatar>
    </div>
    <div>
      <p>svg icon</p>
      <el-avatar icon="//minio-api.codewave-test.163yun.com/lowcode-static/user/csforkf/1723807833050_%E5%87%8F%E5%B0%91_reduce.svg"> </el-avatar>
    </div>
  </div>
</div>`,
  }),
};

/*  当展示类型为图片的时候，图片加载失败的 fallback 行为 */
export const Example3 = {
  name: '图片加载失败的 fallback 行为',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。 */
export const Example4 = {
  name: '图片如何适应容器框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};
