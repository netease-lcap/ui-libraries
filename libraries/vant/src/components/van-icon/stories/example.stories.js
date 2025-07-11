import VanIcon from '../index';

export default {
  id: 'van-icon-examples',
  title: '组件列表/Icon 图标/示例',
  component: VanIcon,
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
      <van-icon v-bind="args" />
    `,
  }),
  args: {
    name: 'chat-o',
    dot: true,
    badge: '1',
  },
};
