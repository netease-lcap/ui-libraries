import Component from '../index';

export default {
  id: 'van-flex-blocks',
  title: '组件列表/Flex 弹性布局/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '单行排布',
  render: () => ({
    setup() {},
    template: `
      <van-flex></van-flex>
    `,
  }),
};

export const MultiLine = {
  name: '多行排布',
  render: () => ({
    template: `<van-flex direction="vertical" mode="block">
    <van-flex direction="horizontal" mode="block">
    </van-flex>
    <van-flex direction="horizontal" mode="block">
    </van-flex>
    </van-flex>`,
  }),
};

export const SpaceBetween = {
  name: '两端排布',
  render: () => ({
    template:
      '<van-flex justify="space-between"><van-flex :wrap="true"></van-flex><van-flex :wrap="true"></van-flex></van-flex>',
  }),
};
