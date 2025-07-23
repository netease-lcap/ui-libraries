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
    setup() {
      return {};
    },
    template: `
      <van-cascader placeholder="请选择"></van-cascader>
    `,
  }),
};

export const Block2 = {
  name: '可清空级联选择器',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-cascader clearable placeholder="请选择"></van-cascader>
    `,
  }),
};

export const Block3 = {
  name: '可搜索级联选择器',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-cascader filterable placeholder="请选择"></van-cascader>
    `,
  }),
};

export const Block4 = {
  name: '多选级联选择器',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-cascader multiple placeholder="请选择"></van-cascader>
    `,
  }),
}; 