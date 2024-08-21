import ElTimeline from '../index';

export default {
  id: 'el-timeline-blocks',
  title: '组件列表/TIMELINE 时间线/内置区块',
  component: ElTimeline,
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
    template: `<el-timeline>
      <el-timeline-item timestamp="2018-04-11">创建成功</el-timeline-item>
      <el-timeline-item timestamp="2018-04-13">通过审核</el-timeline-item>
      <el-timeline-item timestamp="2018-04-15">活动按期开始</el-timeline-item>
    </el-timeline>`,
  }),
};
