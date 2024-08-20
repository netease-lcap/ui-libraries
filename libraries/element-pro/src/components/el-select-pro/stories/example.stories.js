import ElSelectPro from '../index';

export default {
  id: 'el-select-pro-examples',
  title: '组件列表/Select 选择器/示例',
  component: ElSelectPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-select-pro></el-select-pro>',
  }),
};
