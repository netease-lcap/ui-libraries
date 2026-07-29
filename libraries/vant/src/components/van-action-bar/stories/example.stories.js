import Component from '../index';

export default {
  id: 'van-action-bar-examples',
  title: '组件列表/ActionBar 行动栏/示例',
  component: Component,
  parameters: {
    layout: 'fullscreen',
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

export const Badge = {
  name: '徽标',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" dot />
        <van-action-bar-icon icon="cart-o" text="购物车" badge="5" />
        <van-action-bar-icon icon="shop-o" text="店铺" badge="12" />
        <van-action-bar-button type="warning" text="加入购物车" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>
    `,
  }),
};
