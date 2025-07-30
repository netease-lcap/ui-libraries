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
      <div style="height: 400px; display: flex;">
        <van-sidebar default-active="1">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>内容区域</p>
        </div>
      </div>
    `,
  }),
};

export const Block2 = {
  name: '带图标侧边栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar default-active="1">
          <van-sidebar-item index="1" text="首页" icon="home-o" />
          <van-sidebar-item index="2" text="用户" icon="user-o" />
          <van-sidebar-item index="3" text="设置" icon="setting-o" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>内容区域</p>
        </div>
      </div>
    `,
  }),
};

export const Block3 = {
  name: '深色主题侧边栏',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          default-active="1"
          background-color="#2c3e50"
          text-color="#ecf0f1"
          active-text-color="#3498db"
          active-background-color="#34495e">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>内容区域</p>
        </div>
      </div>
    `,
  }),
}; 