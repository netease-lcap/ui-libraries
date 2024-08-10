import ElDropdown from '../index';

export default {
  id: 'el-dropdown-blocks',
  title: '组件列表/DROPDOWN 下拉菜单/内置区块',
  component: ElDropdown,
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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-dropdown>
    <template #default>
      <el-button type="primary" text="更多菜单"></el-button>
    </template>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><el-text text="黄金糕"></el-text></el-dropdown-item>
        <el-dropdown-item><el-text text="狮子头"></el-text></el-dropdown-item>
        <el-dropdown-item><el-text text="螺蛳粉"></el-text></el-dropdown-item>
        <el-dropdown-item><el-text text="双皮奶"></el-text></el-dropdown-item>
        <el-dropdown-item><el-text text="蚵仔煎"></el-text></el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>`,
  }),
};
