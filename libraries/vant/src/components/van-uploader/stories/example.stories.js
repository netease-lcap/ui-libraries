import { multiply } from 'lodash';
import VanUploader from '../index';

export default {
  id: 'van-uploader-examples',
  title: '组件列表/Uploader 上传/示例',
  component: VanUploader,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        values: [
          { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true },
        ],
      };
    },
    template: `
      <van-uploader v-model:modelValue="values" multiple v-bind="args"/>
    `,
  }),
  args: {
    access: 'public',
    ttl: null,
    ttlValue: 1,
    multiple: true,
    autoUpload: true,
  },
};
