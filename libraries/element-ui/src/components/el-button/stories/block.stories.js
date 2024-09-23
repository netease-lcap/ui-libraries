import ElButton from '../index';

export default {
  id: 'el-button-blocks',
  title: '组件列表/Button 按钮/内置区块',
  component: ElButton,
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
  name: '主要按钮',
  render: () => ({
    template: '<el-button type="primary" text="主要按钮"></el-button>',
  }),
};

export const Default = {
  name: '默认按钮',
  render: () => ({
    template: '<el-button text="默认按钮"></el-button>',
  }),
};

export const Text = {
  name: '文字按钮',
  render: () => ({
    template: '<el-button type="text" text="文字按钮"></el-button>',
  }),
};

export const Success = {
  name: '成功按钮',
  render: () => ({
    template: '<el-button type="success" text="成功按钮"></el-button>',
  }),
};

export const Info = {
  name: '信息按钮',
  render: () => ({
    template: '<el-button type="info" text="信息按钮"></el-button>',
  }),
};

export const Warning = {
  name: '警告按钮',
  render: () => ({
    template: '<el-button type="warning" text="警告按钮"></el-button>',
  }),
};

export const Danger = {
  name: '危险按钮',
  render: () => ({
    template: '<el-button type="danger" text="危险按钮"></el-button>',
  }),
};
