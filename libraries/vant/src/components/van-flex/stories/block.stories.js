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
  name: 'Flex',
  render: () => ({
    setup() {},
    template: `
      <van-flex></van-flex>
    `,
  }),
};
