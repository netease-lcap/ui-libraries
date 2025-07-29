import VanSteps from '../index';

export default {
  id: 'van-steps-blocks',
  title: '组件列表/Steps 步骤条/内置区块',
  component: VanSteps,
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
      template: '<div style="width: 100vw;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `
      <van-steps>
        <van-step>
          <van-text text="步骤一"></van-text>
        </van-step>
        <van-step>
          <van-text text="步骤二"></van-text>
        </van-step>
        <van-step>
          <van-text text="步骤三"></van-text>
        </van-step>
      </van-steps>
    `,
  }),
};

export const Vertical = {
  name: '垂直',
  render: () => ({
    template: `
      <van-steps direction="vertical">
        <van-step>
          <van-text text="步骤一"></van-text>
        </van-step>
        <van-step>
          <van-text text="步骤二"></van-text>
        </van-step>
        <van-step>
          <van-text text="步骤三"></van-text>
        </van-step>
      </el-steps>
    `,
  }),
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="height: 300px;width: 88px; margin: 0 auto;"><story/></div>',
    }),
  ],
};
