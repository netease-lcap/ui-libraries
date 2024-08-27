import ElRatePro from '../index';

export default {
  id: 'el-rate-pro-examples',
  title: '组件列表/Rate 评分/示例',
  component: ElRatePro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-rate-pro></el-rate-pro>',
  }),
};

export const Demo1 = {
  name: '自定义图标',
  render: () => ({
    template: '<el-rate-pro iconname="icon-sugar"></el-rate-pro>',
  }),
};
