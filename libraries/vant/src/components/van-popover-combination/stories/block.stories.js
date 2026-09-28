import VanPopoverCombination from '../index';

export default {
  id: 'van-popover-combination-blocks',
  title: '组件列表/Popover 气泡弹出框/内置区块',
  component: VanPopoverCombination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
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
    template: `
    <van-popover-combination placement='bottom-start'>
      <template #reference>
        <van-button text="气泡弹出框"></van-button>
      </template>
    </van-popover-combination>
    `,
  }),
};
