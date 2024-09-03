import ElDescriptions from '../index';

export default {
  id: 'el-descriptions-blocks',
  title: '组件列表/DESCRIPTIONS 描述列表/内置区块',
  component: ElDescriptions,
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
    template: `<el-descriptions>
      <template #title>
        <el-text text="标题"></el-text>
      </template>
      <template #extra>
        <el-text text="操作区"></el-text>
      </template>

      <el-descriptions-item>
        <template #label>
          <el-text text="标签"></el-text>
        </template>
        <el-text text="内容"></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-text text="标签"></el-text>
        </template>
        <el-text text="内容"></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-text text="标签"></el-text>
        </template>
        <el-text text="内容"></el-text>
      </el-descriptions-item>
    </el-descriptions>`,
  }),
};
