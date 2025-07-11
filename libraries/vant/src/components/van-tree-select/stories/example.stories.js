import VanTreeSelect from '../index';

export default {
  id: 'van-tree-select-examples',
  title: '组件列表/TreeSelect 树形选择/示例',
  component: VanTreeSelect,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-tree-select v-bind="args" />
    `,
  }),
  args: {
    value: new Date(),
  },
};
