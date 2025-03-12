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
  name: '菜单栏',
  render: () => ({
    template: `<el-menu
    mode="horizontal"
  >
    <el-sub-menu index="2">
      <el-sub-menu index="2-4">
        <el-menu-item index="2-4-1"><el-text text="item one"></el-text></el-menu-item>
        <el-menu-item index="2-4-2"><el-text text="item two"></el-text></el-menu-item>
        <el-menu-item index="2-4-3"><el-text text="item three"></el-text></el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>`,
  }),
};
