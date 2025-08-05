import Component from '../index';

export default {
  id: 'van-tabs-blocks',
  title: '组件列表/Tabs 标签页/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: 'Tabs 标签页',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-tabs>
        <van-tab><template #title><van-text text="标签1"></van-text></template><van-text text="内容 1"></van-text></van-tab>
        <van-tab><template #title><van-text text="标签2"></van-text></template><van-text text="内容 2"></van-text></van-tab>
        <van-tab><template #title><van-text text="标签3"></van-text></template><van-text text="内容 3"></van-text></van-tab>
      </van-tabs>
    `,
  }),
};
