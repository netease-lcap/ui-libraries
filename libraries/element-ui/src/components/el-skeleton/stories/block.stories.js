import ElSkeleton from '../index';

export default {
  id: 'el-skeleton-blocks',
  title: '组件列表/SKELETON 骨架屏/内置区块',
  component: ElSkeleton,
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
    template: `<el-skeleton>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px;" />
        <el-skeleton-item variant="p" style="width: 50%" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="width: 30%;" />
      </template>
    </el-skeleton>`,
  }),
};
