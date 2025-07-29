import Component from '../index';

export default {
  id: 'van-config-provider-blocks',
  title: '组件列表/ConfigProvider 全局配置/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'ConfigProvider',
  render: () => ({
    setup() {},
    template: `
      <van-config-provider></van-config-provider>
    `,
  }),
}; 
