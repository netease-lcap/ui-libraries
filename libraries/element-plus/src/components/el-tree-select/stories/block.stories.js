import Component from '../index';

export default {
  id: 'el-tree-select-blocks',
  title: '组件列表/TreeSelect 树形选择/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '树形选择',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-tree-select placeholder="请选择" style="width: 240px" />
    </div>
    `,
  }),
}; 