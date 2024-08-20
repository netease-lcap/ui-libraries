import ElInputPro from '../index';

export default {
  id: 'el-input-pro-examples',
  title: '组件列表/Input 输入框/示例',
  component: ElInputPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-input-pro></el-input-pro>',
  }),
};
