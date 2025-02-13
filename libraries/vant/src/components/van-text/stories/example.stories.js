import Component from '../index';

export default {
  id: 'van-text-examples',
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
    setup() {
      return {
        args,
        handleClick(c) {
          console.log('click');
        },
      };
    },
    template: `
      <van-text v-bind="args" @click="handleClick"></van-text>
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
