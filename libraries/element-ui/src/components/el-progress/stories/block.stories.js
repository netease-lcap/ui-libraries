import ElProgress from '../index';

export default {
  id: 'el-progress-blocks',
  title: '组件列表/PROGRESS 进度条/内置区块',
  component: ElProgress,
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
  name: '线性',
  render: () => ({
    template: '<el-progress style="width: 300px;"></el-progress>',
  }),
};

export const Circle = {
  name: '环形',
  render: () => ({
    template: '<el-progress type="circle"></el-progress>',
  }),
};

export const Dashboard = {
  name: '仪表盘',
  render: () => ({
    template: '<el-progress type="dashboard"></el-progress>',
  }),
};
