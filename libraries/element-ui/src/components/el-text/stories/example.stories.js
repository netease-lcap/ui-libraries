import Component from '../index';

export default {
  id: 'el-text-examples',
  title: '组件列表/Text 文本/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
};

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    methods: {
      handleClick(c) {
        console.log('click');
      },
    },
    template: `
      <el-text v-bind="$props" v-html="1234" @click="handleClick"></el-text>
    `,
  }),
  args: {
    color: 'primary',
    size: 'default',
    overflow: 'normal',
    text: 'hello world',
    display: 'normal',
  },
};
