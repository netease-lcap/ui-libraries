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
        values: JSON.stringify([
          { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true },
        ]),
        // values: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg,https://cloud-image',
      };
    },
    methods: {
      onOversize(event) {
        console.log('oversize', event);
      },
      onSuccess(event) {
        console.log('success', event);
      },
      onError(event) {
        console.log('error', event);
      },
      onProgress(event) {
        console.log('progress', event);
      },
      onStart(event) {
        console.log('start', event);
      },
      onAfterRead(event) {
        console.log('after-read', event);
      },
      onBeforeRead(event) {
        console.log('before-read', event);
      },
      onBeforeDelete(event) {
        console.log('before-delete', event);
      },
    },
    template: `
      <van-uploader v-model="values" multiple v-bind="args"
        :headers="{'LCAPTEST': 'test'}"
        :viaOriginURL="true"
        :data="{\&quot;testfata\&quot;:\&quot;ddd\&quot;}"
        :access="private"
        :ttl="true"
        :ttlValue="1"
        @oversize="onOversize"
        @success="onSuccess"
        @error="onError"
        @progress="onProgress"
        @start="onStart"
        @delete="onDelete"
        @after-read="onAfterRead"
        @before-read="onBeforeRead"
        @before-delete="onBeforeDelete"
      ></van-uploader>
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
    converter: 'json',
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
    },
    template: `
      <van-form>
        <van-form-uploader v-model="values" multiple v-bind="args" @oversize="onOversize"></van-form-uploader>
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
    converter: 'json',
  },
};
