import ElTabs from '../index';

export default {
  id: 'el-tabs-blocks',
  title: '组件列表/Tabs 标签页/内置区块',
  component: ElTabs,
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
    template: `
      <el-tabs>
        <el-tab-pane><template #label><el-text text="标签一"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签二"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签三"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
      </el-tabs>
    `,
  }),
};

export const CardStyle = {
  name: '选项卡风格',
  render: () => ({
    template: `
      <el-tabs type="card">
        <el-tab-pane><template #label><el-text text="标签一"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签二"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签三"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
      </el-tabs>
    `,
  }),
};

export const BorderCardStyle = {
  name: '卡片化风格',
  render: () => ({
    template: `
      <el-tabs type="border-card">
        <el-tab-pane><template #label><el-text text="标签一"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签二"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane><template #label><el-text text="标签三"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
      </el-tabs>
    `,
  }),
};
