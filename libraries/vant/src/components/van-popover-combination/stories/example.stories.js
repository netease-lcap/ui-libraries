import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';
import ExampleDemo7 from '../demos/example-demo7.vue';
import ExampleDemo8 from '../demos/example-demo8.vue';
import ExampleDemo9 from '../demos/example-demo9.vue';

export default {
  id: 'van-popover-combination-examples',
  title: '组件列表/Popover 气泡弹出框/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example3 = {
  name: '水平排列',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example4 = {
  name: '弹出位置',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example5 = {
  name: '展示图标',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example6 = {
  name: '禁用选项',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example7 = {
  name: '自定义内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example8 = {
  name: '非受控模式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example9 = {
  name: '使用数据源',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};
