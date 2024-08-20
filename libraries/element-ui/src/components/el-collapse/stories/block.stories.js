import ElCollapse from '../index';

export default {
  id: 'el-collapse-blocks',
  title: '组件列表/COLLAPSE 折叠面板/内置区块',
  component: ElCollapse,
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
    template: `<el-collapse>
      <el-collapse-item>
        <template #title>面板1</template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>面板2</template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>面板3</template>
      </el-collapse-item>
    </el-collapse>`,
  }),
};

export const DataSource = {
  name: '使用数据源',
  render: () => ({
    template: `
      <el-collapse :dataSource="[{}]"></el-collapse>
    `,
  }),
};
