import Component from '../index';

export default {
  id: 'el-watermark-blocks',
  title: '组件列表/Watermark 水印/内置区块',
  component: Component,
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
    template: `<el-watermark>
      <el-flex direction="horizontal" mode="block" style="width: 100%; height: 200px;">
      </el-flex>
    </el-watermark>`,
  }),
};
