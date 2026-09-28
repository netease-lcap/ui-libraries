import Component from '../index';

export default {
  id: 'van-nav-bar-blocks',
  title: '组件列表/NavBar 导航栏/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Default = {
  name: '导航栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-nav-bar>
        <template #left>
          <van-text text="返回"></van-text>
        </template>
        <template #title>
          <van-text text="导航栏"></van-text>
        </template>
      </van-nav-bar>
    `,
  }),
};
