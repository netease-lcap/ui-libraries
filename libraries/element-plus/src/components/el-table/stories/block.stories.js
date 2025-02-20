import ElTabs from '../index';

export default {
  id: 'el-table-blocks',
  title: '组件列表/Table 数据表格/内置区块',
  component: ElTabs,
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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `
      <el-table>
      </el-table>
    `,
  }),
};

export const elTableBlock = {
  name: 'el-table区块',
  render: () => ({
    template: `  <el-table-plus  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table-plus>
    `,
  }),
};
