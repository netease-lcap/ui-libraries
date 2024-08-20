import ElTablePro from '../index';

export default {
  id: 'el-table-pro-examples',
  title: '组件列表/Table 表格/示例',
  component: ElTablePro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-table-pro></el-table-pro>',
  }),
};
