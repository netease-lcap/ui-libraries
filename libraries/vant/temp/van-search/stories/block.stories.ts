import Component from '../index';

export default {
  id: 'van-search-blocks',
  title: '组件列表/Search 搜索/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'Search',
  render: () => ({
    setup() {},
    template: `
      <van-search></van-search>
    `,
  }),
}; 
