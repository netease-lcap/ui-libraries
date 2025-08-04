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
      };
    },
    data() {
      return {
        // values: JSON.stringify([
        //   { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
        //   // Uploader 根据文件后缀来判断是否为图片文件
        //   // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        //   { url: 'https://cloud-image', isImage: true },
        // ]),
        values: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg,https://cloud-image',
      };
    },
    methods: {
      onOversize(file, detail) {
        console.log('oversize', file, detail);
      },
      onUpdateModelValue(fileList) {
        console.log('onUpdateModelValue', fileList);
      },
    },
    template: `
      <van-uploader v-model="values" multiple v-bind="args" @oversize="onOversize" @update:uploadedModelValue="onUpdateModelValue"></van-uploader>
      {{ values }}
    `,
  }),
  args: {
    access: 'public',
    ttl: null,
    ttlValue: 1,
    multiple: true,
    autoUpload: true,
    maxSize: '10KB',
    maxCount: Infinity,
    lcapIsCompress: true,
    viaOriginURL: '',
  },
};

export const FormItem = {
  name: '表单项',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        // values: JSON.stringify([
        //   { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
        //   // Uploader 根据文件后缀来判断是否为图片文件
        //   // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        //   { url: 'https://cloud-image', isImage: true },
        // ]),
        values: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg,https://cloud-image',
      };
    },
    methods: {
      onOversize(file, detail) {
        console.log('oversize', file, detail);
      },
      onUpdateModelValue(fileList) {
        console.log('onUpdateModelValue', fileList);
      },
    },
    template: `
      <van-form>
        <van-form-uploader v-model="values" multiple v-bind="args" @oversize="onOversize" @update:uploadedModelValue="onUpdateModelValue"></van-form-uploader>
      </van-form>
      {{ values }}
    `,
  }),
  args: {
    access: 'public',
    ttl: null,
    ttlValue: 1,
    multiple: true,
    autoUpload: true,
    maxSize: '10KB',
    maxCount: Infinity,
    lcapIsCompress: true,
    viaOriginURL: '',
  },
};
