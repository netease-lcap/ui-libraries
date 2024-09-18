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
      <el-button type="primary" text="下拉菜单" icon="arrow-down" iconPosition="right"></el-button>
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
  name: '分隔按钮样式',
  render: () => ({
    template: `<el-dropdown type="primary" :splitButton="true" text="下拉菜单">
    <template #items>
      <el-dropdown-item><el-text text="选项一"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项二"></el-text></el-dropdown-item>
      <el-dropdown-item><el-text text="选项三"></el-text></el-dropdown-item>
    </template>
  </el-dropdown>`,
  }),
};
