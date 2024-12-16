import Component from '../index';

export default {
  id: '{{tagName}}-examples',
  title: '组件列表/{{compName}}/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      '{{tagName}}': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: '<{{tagName}} v-bind="args"></{{tagName}}>',
  }),
  args: {
    text: 'Hello world',
  },
};
