import ElRangeInputPro from '../index';

export default {
  id: 'el-range-input-pro-examples',
  title: '组件列表/RangeInput 范围输入框/示例',
  component: ElRangeInputPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-range-input-pro></el-range-input-pro>',
  }),
};
