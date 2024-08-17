import ElBreadcrumb from '../index';

export default {
  id: 'el-breadcrumb-blocks',
  title: '组件列表/BREADCRUMB 面包屑/内置区块',
  component: ElBreadcrumb,
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
      template: '<div style="width: auto;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-breadcrumb separator="/">
      <el-breadcrumb-item><el-text text="主页面"></el-text></el-breadcrumb-item>
      <el-breadcrumb-item><el-text text="一级子页面"></el-text></el-breadcrumb-item>
      <el-breadcrumb-item><el-text text="二级子页面"></el-text></el-breadcrumb-item>
    </el-breadcrumb>`,
  }),
};

export const Auto = {
  name: '自动生成面包屑',
  render: () => ({
    template: '<el-breadcrumb :auto="true" separator="/"></el-breadcrumb>',
  }),
};
