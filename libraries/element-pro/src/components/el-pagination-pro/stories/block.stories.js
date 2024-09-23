import ElPaginationPro from '../index';

export default {
  id: 'el-pagination-pro-blocks',
  title: '组件列表/Pagination 分页/内置区块',
  component: ElPaginationPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div ><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-pagination-pro></el-pagination-pro>',
  }),
};

// export const Mini = {
//   name: '最小单元分页',
//   render: () => ({
//     template: '<el-pagination-mini-pro></el-pagination-mini-pro>',
//   }),
// };
