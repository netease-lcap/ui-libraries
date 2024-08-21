import Component from '../index';

export default {
  id: 'el-backTop-examples',
  title: '组件列表/Button 按钮/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Primary = {
  name: '基础用法 ',
  render: () => ({
    template: '<el-backtop ></el-backtop>',
  }),
};
