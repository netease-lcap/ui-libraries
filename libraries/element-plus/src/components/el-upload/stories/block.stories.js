import ElUpload from '../index';

export default {
  id: 'el-upload-blocks',
  title: '组件列表/upload 上传/内置区块',
  component: ElUpload,
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
      template: '<div style="width: 300px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-upload>
    <template #trigger>
        <el-text text="点击上传"></el-text>
      </template></el-upload>`,
  }),
};
