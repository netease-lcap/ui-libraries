import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';

export default {
  id: 'el-progress-examples',
  title: '组件列表/PROGRESS 进度条/示例',
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
  name: '线形进度条',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  百分比不占用额外控件，适用于文件上传等场景。 */
export const Example2 = {
  name: '百分比内显',
  render: () => ({
    template: `<div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
</div>`,
  }),
};

/*  可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。 */
export const Example3 = {
  name: '自定义颜色',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。 */
export const Example4 = {
  name: '环形进度条',
  render: () => ({
    template: `<div><el-progress type="circle" :percentage="0"></el-progress>
<el-progress type="circle" :percentage="25"></el-progress>
<el-progress type="circle" :percentage="100" status="success"></el-progress>
<el-progress type="circle" :percentage="70" status="warning"></el-progress>
<el-progress type="circle" :percentage="50" status="exception"></el-progress></div>`,
  }),
};

/*  */
export const Example5 = {
  name: '仪表盘形进度条',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};
