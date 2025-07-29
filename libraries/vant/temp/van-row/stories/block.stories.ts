import Component from '../index';

export default {
  id: 'van-row-blocks',
  title: '组件列表/Row 行/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'Row',
  render: () => ({
    setup() {},
    template: `
      <van-row></van-row>
    `,
  }),
}; 
