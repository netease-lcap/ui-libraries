import { ElTag , ElCheckTag } from '../index';

export default {
  id: 'el-tag-blocks',
  title: '组件列表/Tag 标签/内置区块',
  components: { ElTag, ElCheckTag },
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

// export const Check = {
//   name: '可选标签',
//   render: () => ({
//     template: '<el-check-tag :checked="true" text="默认标签"></el-check-tag>',
//   }),
// };

// export const Large = {
//   name: '大型标签',
//   render: () => ({
//     template: '<el-tag size="large" closable text="大型标签"></el-tag>',
//   }),
// };

// export const Middle = {
//   name: '中型标签',
//   render: () => ({
//     template: '<el-tag size="default" closable text="中型标签"></el-tag>',
//   }),
// };

// export const Small = {
//   name: '小型标签',
//   render: () => ({
//     template: '<el-tag size="small" closable text="小型标签"></el-tag>',
//   }),
// };
