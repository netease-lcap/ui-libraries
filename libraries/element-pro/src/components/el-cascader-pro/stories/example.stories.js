import ElCascaderPro from '../index';

export default {
  id: 'el-cascader-pro-examples',
  title: '组件列表/Cascader 级联选择器/示例',
  component: ElCascaderPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-cascader-pro></el-cascader-pro>',
  }),
};
