import ElPopconfirm from '../index';

export default {
  id: 'el-popconfirm-blocks',
  title: '组件列表/POPCONFIRM 气泡确认框/内置区块',
  component: ElPopconfirm,
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
    template: '<el-popconfirm></el-popconfirm>',
  }),
};
