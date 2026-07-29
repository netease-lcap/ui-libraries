import Component from '../index';

export default {
  id: 'van-sidebar-blocks',
  title: '组件列表/Sidebar 侧边导航/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础侧边栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
        <van-sidebar default-active="1" >
            <van-sidebar-item title="导航一" />
            <van-sidebar-item title="导航二" />
            <van-sidebar-item title="导航三" />
          <template #item=" current ">
            <van-sidebar-item title="导航项"/>
          </template>
        </van-sidebar>
    `,
  }),
};
