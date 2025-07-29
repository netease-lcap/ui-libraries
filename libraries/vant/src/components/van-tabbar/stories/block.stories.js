import Component from '../index';

export default {
  id: 'van-tabbar-blocks',
  title: '组件列表/Tabbar 标签栏/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: 'Tabbar 标签栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-tabbar>
        <van-tabbar-item icon="home-o"><van-text text="标签"></van-text></van-tabbar-item>
        <van-tabbar-item icon="search"><van-text text="标签"></van-text></van-tabbar-item>
        <van-tabbar-item icon="friends-o"><van-text text="标签"></van-text></van-tabbar-item>
        <van-tabbar-item icon="setting-o"><van-text text="标签"></van-text></van-tabbar-item>
      </van-tabbar>
    `,
  }),
};
