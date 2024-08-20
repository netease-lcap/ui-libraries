import ElRadioPro from '../index';

export default {
  id: 'el-radio-pro-examples',
  title: '组件列表/Radio 单选框/示例',
  component: ElRadioPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-radio-pro></el-radio-pro>',
  }),
};
