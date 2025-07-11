import VanBackTop from '../index';

export default {
  id: 'van-back-top-examples',
  title: '组件列表/BackTop 返回顶部/示例',
  component: VanBackTop,
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
      <van-back-top v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
