import ElRow from '../index';

export default {
  id: 'el-row-blocks',
  title: '组件列表/ROW 布局/内置区块',
  component: ElRow,
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

export const Demo1 = {
  name: '3列样式（8:8:8）',
  render: () => ({
    template: `<el-row :gutter="16">
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
    </el-row>`,
  }),
};

export const Demo2 = {
  name: '4列样式（2:4:8:10）',
  render: () => ({
    template: `<el-row :gutter="16">
      <el-col :span="2"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="8"></el-col>
      <el-col :span="10"></el-col>
    </el-row>`,
  }),
};

export const Demo3 = {
  name: '2列样式（8:16）',
  render: () => ({
    template: `<el-row :gutter="16">
      <el-col :span="8"></el-col>
      <el-col :span="16"></el-col>
    </el-row>`,
  }),
};
