import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';

export default {
  id: 'el-image-examples',
  title: '组件列表/IMAGE 图片/示例',
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
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example2 = {
  name: '占位内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example3 = {
  name: '加载失败',
  render: () => ({
    template: `<div><div class="demo-image__error">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image></el-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <el-image>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</div></div>`,
  }),
};

/*  */
export const Example4 = {
  name: '懒加载',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example5 = {
  name: '大图预览',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};
