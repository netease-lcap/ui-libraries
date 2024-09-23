import ElTreePro from '../index';

export default {
  id: 'el-tree-pro-blocks',
  title: '组件列表/Tree 树/内置区块',
  component: ElTreePro,
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
      template: '<div ><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-tree-pro>
    <template #leaf="current">
    </template>
    </el-tree-pro>`,
  }),
};
