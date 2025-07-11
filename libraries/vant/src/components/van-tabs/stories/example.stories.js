import { VanTabs, VanTab } from '../index';

export default {
  id: 'van-tabs-examples',
  title: '组件列表/Tabs 标签页/示例',
  component: { VanTabs, VanTab },
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
     <van-tabs v-bind="args">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    `,
  }),
  args: {
    value: new Date(),
  },
};
