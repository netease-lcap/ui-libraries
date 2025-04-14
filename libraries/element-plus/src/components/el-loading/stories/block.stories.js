import ElLoading from '../index';

export default {
  id: 'el-loading-blocks',
  title: '组件列表/Loading 加载/内置区块',
  component: ElLoading,
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
  name: '基础用法',
  render: () => ({
    template: `<el-loading>
    </el-loading>`,
  }),
};
