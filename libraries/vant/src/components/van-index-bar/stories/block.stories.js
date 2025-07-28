import Component from '../index';

export default {
  id: 'van-index-bar-blocks',
  title: '组件列表/IndexBar 索引栏/区块',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

export const Default = {
  name: '索引栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-index-bar>
        <van-index-anchor index="A">A</van-index-anchor>
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="B">B</van-index-anchor>
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="C">C</van-index-anchor>
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="D">D</van-index-anchor>
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />
      </van-index-bar>
    `,
  }),
};
