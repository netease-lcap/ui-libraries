import VanSkeleton from '../index';

export default {
  id: 'van-skeleton-blocks',
  title: '组件列表/Skeleton 骨架屏/内置区块',
  component: VanSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 100%;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<van-skeleton title avatar :row="3" />',
  }),
};
