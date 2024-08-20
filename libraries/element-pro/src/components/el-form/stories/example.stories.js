import ElFormPro from '../index';

export default {
  id: 'el-form-pro-examples',
  title: '组件列表/Form 表单/示例',
  component: ElFormPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-form-pro></el-form-pro>',
  }),
};
