import Component from '../index';

export default {
  id: 'van-router-view-blocks',
  title: '组件列表/RouterView 路由视图/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'RouterView',
  render: () => ({
    setup() {},
    template: `
      <van-router-view></van-router-view>
    `,
  }),
};
