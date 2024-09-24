import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';

export default {
  id: 'el-badge-examples',
  title: '组件列表/BADGE 标记/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  展示新消息数量。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可自定义最大值。 */
export const Example2 = {
  name: '最大值',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以显示数字以外的文本内容。 */
export const Example3 = {
  name: '自定义内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  以红点的形式标注需要关注的内容。 */
export const Example4 = {
  name: '小红点',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};
