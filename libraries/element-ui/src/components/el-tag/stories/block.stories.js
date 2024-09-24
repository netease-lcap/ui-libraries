import ElTag from '../index';

export default {
  id: 'el-tag-blocks',
  title: '组件列表/TAG 标签/内置区块',
  component: ElTag,
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
  name: '默认标签',
  render: () => ({
    template: '<el-tag text="默认标签"></el-tag>',
  }),
};

// export const Medium = {
//   name: '中等标签',
//   render: () => ({
//     template: '<el-tag size="medium" closable text="默认标签"></el-tag>',
//   }),
// };

// export const Small = {
//   name: '小型标签',
//   render: () => ({
//     template: '<el-tag size="small" closable text="默认标签"></el-tag>',
//   }),
// };

// export const Mini = {
//   name: '超小标签',
//   render: () => ({
//     template: '<el-tag size="mini" closable text="默认标签"></el-tag>',
//   }),
// };
