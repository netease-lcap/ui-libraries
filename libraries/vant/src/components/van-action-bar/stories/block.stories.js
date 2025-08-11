import Component from '../index';

export default {
  id: 'van-action-bar-blocks',
  title: '组件列表/ActionBar 动作栏/区块',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

export const Default = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon icon="cart-o" text="购物车" />
        <van-action-bar-icon icon="shop-o" text="店铺" />

        <van-action-bar-button type="warning" text="购物车" />
        <van-action-bar-button type="danger" text="购买" />
      </van-action-bar>
    `,
  }),
};
