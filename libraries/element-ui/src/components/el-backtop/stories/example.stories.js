import Component from '../index';

export default {
  id: 'el-backtop-examples',
  title: '组件列表/Backtop 回到顶部/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    target: {
      control: 'text',
    },
    visibilityHeight: {
      control: 'number',
    },
    right: {
      control: 'number',
    },
    bottom: {
      control: 'number',
    },
  },
};

export const Primary = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<div>
      <div style="height: 2000px;"></div>
      <el-backtop v-bind="$props"></el-backtop>
    </div>`,
  }),
};
