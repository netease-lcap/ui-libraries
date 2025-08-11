import Component from '../index';

export default {
  id: 'van-dropdown-menu-blocks',
  title: '组件列表/DropdownMenu 下拉菜单/内置区块',
  component: Component,
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
    template: `<van-dropdown-menu>
      <van-dropdown-item>
        <template #title>
          <van-text>标题1</van-text>
        </template>
        <van-flex />
      </van-dropdown-item>
      <van-dropdown-item>
        <template #title>
          <van-text>标题2</van-text>
        </template>
        <van-flex />
    </van-dropdown-menu>`,
  }),
};
