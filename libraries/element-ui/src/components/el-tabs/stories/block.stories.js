import ElTabs from '../index';

export default {
  id: 'el-tabs-blocks',
  title: '组件列表/TABS 标签页/内置区块',
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
      <el-tabs value="B">
        <el-tab-pane name="A"><template #label><el-text text="标签一"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane name="B"><template #label><el-text text="标签二"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
        <el-tab-pane name="C"><template #label><el-text text="标签三"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>
      </el-tabs>
    `,
  }),
};
