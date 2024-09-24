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
import ExampleDemo11 from '../demos/example-demo11.vue';
import ExampleDemo12 from '../demos/example-demo12.vue';
import ExampleDemo13 from '../demos/example-demo13.vue';

export default {
  id: 'el-input-examples',
  title: '组件列表/INPUT 输入框/示例',
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
  name: '禁用状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example3 = {
  name: '可清空',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example4 = {
  name: '密码框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  带有图标标记输入类型 */
export const Example5 = {
  name: '带 icon 的输入框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。 */
export const Example6 = {
  name: '文本域',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。 */
export const Example7 = {
  name: '可自适应文本高度的文本域',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可前置或后置元素，一般为标签或按钮 */
export const Example8 = {
  name: '复合型输入框',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example9 = {
  name: '尺寸',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  根据输入内容提供对应的输入建议 */
export const Example10 = {
  name: '带输入建议',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo10,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可自定义输入建议的显示 */
export const Example11 = {
  name: '自定义模板',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo11,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  从服务端搜索数据 */
export const Example12 = {
  name: '远程搜索',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo12,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example13 = {
  name: '输入长度限制',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo13,
    },
    template: '<example-demo></example-demo>',
  }),
};
