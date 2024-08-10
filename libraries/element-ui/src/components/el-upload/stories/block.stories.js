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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-upload urlField="filePath" url="/upload" list-type="text" converter="json"><template #default><el-button type="primary" icon="ri-upload-line" text="点击上传"></el-button></template></el-upload>',
  }),
};

export const Card = {
  name: '图片卡片',
  render: () => ({
    template: '<el-upload urlField="filePath" url="/upload" list-type="picture-card" converter="json" accept=".png,.jpg,.jpeg,.gif,.bmp"></el-upload>',
  }),
};

export const Picture = {
  name: '图片上传',
  render: () => ({
    template: '<el-upload urlField="filePath" url="/upload" list-type="picture" converter="json" accept=".png,.jpg,.jpeg,.gif,.bmp"><template #default><el-button type="primary" icon="ri-upload-line" text="点击上传"></el-button></template></el-upload>',
  }),
};


export const DragPicture = {
  name: '拖拽上传',
  render: () => ({
    template: '<el-upload urlField="filePath" url="/upload" :drag="true" list-type="picture" converter="json" accept=".png,.jpg,.jpeg,.gif,.bmp"></el-upload>',
  }),
};
