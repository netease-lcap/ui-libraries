import { VanTabbar, VanTabbarItem } from '../index';

export default {
  id: 'van-tabbar-examples',
  title: '组件列表/Tabbar 标签栏/示例',
  component: { VanTabbar, VanTabbarItem },
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
     <van-tabbar v-bind="args">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    `,
  }),
  args: {
    route: true,
  },
};
