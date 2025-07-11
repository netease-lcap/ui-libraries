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
    template: `
      <van-uploader v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
