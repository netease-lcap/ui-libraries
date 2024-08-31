import ElBacktop from '../index';

export default {
  id: 'el-backtop-blocks',
  title: '组件列表/Backtop 回到顶部/内置区块',
  component: ElBacktop,
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
  name: '基础用法',
  render: () => ({
    template: '<el-backtop></el-backtop>',
  }),
};
