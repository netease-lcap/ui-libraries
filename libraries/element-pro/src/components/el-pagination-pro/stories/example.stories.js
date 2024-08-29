import ElPaginationPro from '../index';

export default {
  id: 'el-pagination-pro-examples',
  title: '组件列表/Pagination 分页/示例',
  component: ElPaginationPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-pagination-pro :total="22" show-jumper></el-pagination-pro>',
  }),
};
