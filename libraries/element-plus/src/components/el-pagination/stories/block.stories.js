import Components from '../index';

export default {
  id: 'el-pagination-plus-blocks',
  title: '组件列表/ Pagination 分页/内置区块',
  component: Components,
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
    template: '<el-pagination  layout="prev, pager, next" :total="50" />',
  }),
};
