import ElImage from '../index';

export default {
  id: 'el-image-blocks',
  title: '组件列表/IMAGE 图片/内置区块',
  component: ElImage,
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
    template: '<el-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"></el-image>',
  }),
};
