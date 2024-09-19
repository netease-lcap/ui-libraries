import ElMenu from '../index';

export default {
  id: 'el-menu-blocks',
  title: '组件列表/MENU 导航菜单/内置区块',
  component: ElMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 800px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '导航菜单',
  render: () => ({
    beforeCreate() {
      this.$global = {
        userInfo: {
          UserName: 'Yuyang',
        },
      };
    },
    template: `<el-menu background-color="#545c64" text-color="#fff" style="color: #fff; padding: 0 20px;" active-text-color="#ffd04b" mode="horizontal" defaultActive="menu1">
    <template #left>
      <el-flex mode="flex" :gutter="12" alignment="center" style="min-width: 160px; margin-right: 12px;">
        <el-image fit="cover" src="/assets/lcap-logo-light.svg" style="width: 28px; height: 28px;"></el-image>
        <el-text text="应用名称" size="large" style="--custom-start: auto;"></el-text>
      </el-flex>
    </template>
    <el-menu-item index="menu1"><template #default><el-text text="菜单项一"></el-text></template></el-menu-item>
    <el-menu-item index="menu2"><template #default><el-text text="菜单项二"></el-text></template></el-menu-item>
    <el-submenu><template #title><el-text text="子菜单"></el-text></template><template #default><el-menu-item><template #default><el-text text="菜单项"></el-text></template></el-menu-item></template></el-submenu>
    <template #right>
      <el-dropdown :hide-on-click="false">
        <el-flex mode="flex" alignment="center" :gutter="12" style="color: #fff;cursor: pointer;">
          <el-image fit="cover" src="/assets/avatar-default.svg" style="width: 36px; height: 36px;"></el-image>
          <el-text :text="$global.userInfo.UserName"></el-text>
        </el-flex>
        <template #items>
          <el-dropdown-item>
            <el-text text="安全退出"></el-text>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </template>
    </el-menu>`,
  }),
};

export const SideBar = {
  name: '侧边栏',
  render: () => ({
    template: `<el-menu style="height: 100%;">
      <el-menu-item index="1"><el-text text="导航一"></el-text></el-menu-item>
      <el-menu-item index="2"><el-text text="导航二"></el-text></el-menu-item>
      <el-menu-item index="3"><el-text text="导航三"></el-text></el-menu-item>
    </el-menu>`,
  }),
  decorators: [
    () => ({
      template: '<div style="width: 256px; margin: 0 auto;"><story/></div>',
    }),
  ],
};
