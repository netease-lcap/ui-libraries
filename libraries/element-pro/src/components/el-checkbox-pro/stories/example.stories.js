import ElCheckboxPro from '../index';

export default {
  id: 'el-checkbox-pro-examples',
  title: '组件列表/Checkbox 多选框/示例',
  component: ElCheckboxPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-checkbox-pro></el-checkbox-pro>',
  }),
};
