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
        handleLoad: (e) => {
          console.log('load', e);
        },
      };
    },
    template: `
      <van-icon v-bind="args" @load="handleLoad" />
    `,
  }),
  args: {
    name: 'search',
    defaultName: 'photo-o',
    dot: true,
    badge: '1',
  },
};
