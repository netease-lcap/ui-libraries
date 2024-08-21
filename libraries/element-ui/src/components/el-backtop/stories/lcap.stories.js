import Component from '../index';

export default {
  id: 'el-backTop-lcap-exmaples',
  title: '组件列表/Button 按钮/扩展示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text', ''],
    },
    size: { control: 'radio', options: ['medium', 'small', 'mini', ''] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
  },
};

export const Primary = {
  name: '基础用法 ',
  render: () => ({
    template: '<el-backtop ></el-backtop>',
  }),
};
