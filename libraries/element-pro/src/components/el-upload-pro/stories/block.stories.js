import ElUploadPro from '../index';

export default {
  id: 'el-upload-pro-blocks',
  title: '组件列表/Upload 上传/内置区块',
  component: ElUploadPro,
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
      template: '<story/>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-upload-pro converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
      <template #trigger>
        <el-button icon="upload" type="primary" text="点击上传"></el-button>
      </template>
    </el-upload-pro>`,
  }),
};

export const Image = {
  name: '图片上传',
  render: () => ({
    template: `
      <el-upload-pro theme="image" accept=".png,.jpg,.jpeg,.gif,.bmp" converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
        <template #trigger>
          <el-button icon="upload" type="primary" text="点击上传"></el-button>
        </template>
      </el-upload-pro>
    `,
  }),
};

export const DragUpload = {
  name: '拖拽上传',
  render: () => ({
    template: `<el-upload-pro theme="file" :draggable="true" converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
     <template #trigger>
        <el-button icon="upload" type="primary" text="点击上传"></el-button>
      </template>
    </el-upload-pro>`,
  }),
};

export const ImageDragUpload = {
  name: '批量上传文件',
  render: () => ({
    template: `<el-upload-pro theme="file-flow" :autoUpload="false" :multiple="true" :draggable="true" converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
      <template #trigger>
        <el-button icon="upload" type="primary" text="点击上传"></el-button>
      </template>
    </el-upload-pro>`,
  }),
};
