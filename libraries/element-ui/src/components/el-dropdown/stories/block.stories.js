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
      template: '<div style="width: auto;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-dropdown>
    <template #default>
      <el-flex alignment="center" :gutter="8">
        <el-text color="primary" text="下拉菜单"></el-text>
        <el-icon name="arrow-down"></el-icon>
      </el-flex>
    </template>
    <template #items>
      <el-dropdown-item><el-text text="选项一"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项二"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项三"></el-text></el-dropdown-item>
    </template>
  </el-dropdown>`,
  }),
};

export const ButtonStyle = {
  name: '按钮样式',
  render: () => ({
    template: `<el-dropdown split-button>
    <template #default>
      <el-text text="下拉菜单"></el-text>
    </template>
    <template #items>
      <el-dropdown-item><el-text text="选项一"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项二"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项三"></el-text></el-dropdown-item>
    </template>
  </el-dropdown>`,
  }),
};
