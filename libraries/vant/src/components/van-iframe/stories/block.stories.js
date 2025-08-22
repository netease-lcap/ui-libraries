import Component from '../index';

export default {
  id: 'van-iframe-blocks',
  title: '组件列表/Iframe 内嵌页面/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: 'Iframe',
  render: () => ({
    setup() {},
    template: ` <van-iframe src="https://sf.163.com" style="width: 100%; height: 400px;"></van-iframe>
    `,
  }),
};
