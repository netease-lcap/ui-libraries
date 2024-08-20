import ElUploadPro from '../index';

export default {
  id: 'el-upload-pro-examples',
  title: '组件列表/Upload 上传/示例',
  component: ElUploadPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-upload-pro></el-upload-pro>',
  }),
};
