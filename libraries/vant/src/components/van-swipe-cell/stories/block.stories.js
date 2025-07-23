import Component from '../index';

export default {
  id: 'van-swipe-cell-blocks',
  title: '组件列表/SwipeCell 滑动单元格/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础滑动单元格',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-swipe-cell>
        <van-cell title="单元格" value="内容"></van-cell>
        <template #right>
          <van-button square type="danger" text="删除"></van-button>
        </template>
      </van-swipe-cell>
    `,
  }),
};

export const Block2 = {
  name: '左右滑动',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-swipe-cell>
        <van-cell title="单元格" value="内容"></van-cell>
        <template #left>
          <van-button square type="primary" text="选择"></van-button>
        </template>
        <template #right>
          <van-button square type="danger" text="删除"></van-button>
        </template>
      </van-swipe-cell>
    `,
  }),
}; 
