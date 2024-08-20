import ElInputNumberPro from '../index';

export default {
  id: 'el-input-number-pro-examples',
  title: '组件列表/InputNumber 数字输入框/示例',
  component: ElInputNumberPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-input-number-pro></el-input-number-pro>',
  }),
};
