import Component from '../index';

export default {
  id: 'van-cascader-blocks',
  title: '组件列表/Cascader 级联选择器/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础级联选择器',
  render: () => ({
    template: `
      <van-cascader placeholder="请选择"></van-cascader>
    `,
  }),
};
