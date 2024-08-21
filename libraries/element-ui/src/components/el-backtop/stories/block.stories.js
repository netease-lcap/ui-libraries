import ElBackTop from '../index';

export default {
  id: 'el-backTop-blocks',
  title: '组件列表/Button 按钮/内置区块',
  component: ElBackTop,
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
      template: '<story/>',
    }),
  ],
};

export const Primary = {
  name: '基础用法 ',
  render: () => ({
    template: '<el-backtop></el-backtop>',
  }),
};
