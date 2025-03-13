import Components from '../index';

export default {
  id: 'el-pagination-pro-examples',
  title: '组件列表/ Pagination 分页/ 示例',
  component: Components,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-pagination-plus size="small" layout="prev, pager, next" :total="50" />',
  }),
};
