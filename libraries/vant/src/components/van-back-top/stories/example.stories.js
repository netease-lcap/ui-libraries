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
    methods: {
      onClick(event) {
        console.log('onClick', event);
      },
    },
    template: `
    <div style="height: 2000px"></div>
      <van-back-top v-bind="args"  @click="onClick"/>
    `,
  }),
  args: {
  },
};

export const SlotExample = {
  name: '自定义内容',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-back-top v-bind="args"><van-icon name="back-top" style="font-size: 20px;font-weight:600"/></van-back-top>
    `,
  }),
  args: {
    customContent: false,
  },
};
