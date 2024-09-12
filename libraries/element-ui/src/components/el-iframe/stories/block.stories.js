import ElAbsoluteLayout from '../index';

export default {
  id: 'el-iframe-blocks',
  title: '组件列表/Iframe/内置区块',
  component: ElAbsoluteLayout,
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
    template: '<el-iframe src="https://codewave.163.com" style="width: 100%; height: 400px;"></el-iframe>',
  }),
};
