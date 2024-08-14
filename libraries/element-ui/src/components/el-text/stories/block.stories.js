import ElText from '../index';

export default {
  id: 'el-text-blocks',
  title: '组件列表/Text 文本/内置区块',
  component: ElText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [() => ({
    provide() {
      return {
        VUE_APP_DESIGNER: true,
      };
    },
    template: '<div style="width: 100px;"><story/></div>',
  })],
};

export const Default = {
  name: '普通文本',
  render: () => ({
    template: '<el-text text="普通文本"></el-text>',
  }),
};

export const smallText = {
  name: '小号文本',
  render: () => ({
    template: '<el-text size="small" text="小号文本"></el-text>',
  }),
};

export const LargeText = {
  name: '大号文本',
  render: () => ({
    template: '<el-text size="large" text="大号文本"></el-text>',
  }),
};

export const PrimaryText = {
  name: '主要文本',
  render: () => ({
    template: '<el-text color="primary" text="主要文本"></el-text>',
  }),
};

export const SecondaryText = {
  name: '辅助文本',
  render: () => ({
    template: '<el-text color="secondary" text="辅助文本"></el-text>',
  }),
};

export const SuccessText = {
  name: '成功文本',
  render: () => ({
    template: '<el-text color="success" text="成功文本"></el-text>',
  }),
};

export const WarningText = {
  name: '警告文本',
  render: () => ({
    template: '<el-text size="warning" text="警告文本"></el-text>',
  }),
};

export const ErrorText = {
  name: '错误文本',
  render: () => ({
    template: '<el-text color="error" text="错误文本"></el-text>',
  }),
};

export const DisabledText = {
  name: '禁用文本',
  render: () => ({
    template: '<el-text color="disabled" text="禁用文本"></el-text>',
  }),
};

export const EllipsisText = {
  name: '文本过长省略',
  render: () => ({
    template: '<el-text overflow="ellipsis" text="文字过长省略过长省略过长省略过长省略过长省略。"></el-text>',
  }),
};
