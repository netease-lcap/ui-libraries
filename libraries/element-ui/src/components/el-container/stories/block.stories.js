import ElContainer from '../index';

export default {
  id: 'el-container-blocks',
  title: '组件列表/CONTAINER 布局容器/内置区块',
  component: ElContainer,
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
  name: '两栏-左侧固定',
  render: () => ({
    template: `<el-container style="height:100%">
      <el-header></el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>`,
  }),
};

export const Demo1 = {
  name: '三栏-常规',
  render: () => ({
    template: `<el-container style="height:100%">
      <el-header></el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main></el-main>
        <el-aside></el-aside>
      </el-container>
    </el-container>`,
  }),
};

export const Demo2 = {
  name: '三栏-全部',
  render: () => ({
    template: `<el-container style="height:100%">
      <el-header></el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main></el-main>
        <el-aside></el-aside>
      </el-container>
      <el-footer></el-footer>
    </el-container>`,
  }),
};
