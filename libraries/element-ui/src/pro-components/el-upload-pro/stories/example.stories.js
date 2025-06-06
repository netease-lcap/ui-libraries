import ElUploadPro from '../index';

export default {
  id: 'el-upload-pro-examples',
  title: 'Pro组件列表/Upload 上传/示例',
  component: ElUploadPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    methods: {
      onUpload(event) {
        console.log(event, 'onUpload');
      },
    },
    mounted() {
      console.log(this.$refs.upload, 'this.$refs.upload');
      // this.$refs.upload.triggerUpload();
    },
    template: `
    <div>
      <el-upload-pro :BeforeUpload="onUpload" ref="upload" theme="image" :autoUpload="false"></el-upload-pro>
      <el-button @click="onUpload">上传</el-button>
    </div>
    `,
  }),
};
