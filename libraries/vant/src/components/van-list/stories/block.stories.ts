import Component from '../index';

export default {
  id: 'van-list-blocks',
  title: '组件列表/List 列表/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基础列表',
  render: () => ({
    setup() {},
    template: `    <van-list data-nodepath="1908c2e6023f486688753b41f4ae903e" key="component-1908c2e6023f486688753b41f4ae903e" :dataSource="[{}, {}, {}]"   >

    </van-list>
    `,
  }),
};
