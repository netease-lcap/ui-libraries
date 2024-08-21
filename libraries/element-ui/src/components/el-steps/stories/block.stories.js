import ElSteps from '../index';

export default {
  id: 'el-steps-blocks',
  title: '组件列表/STEPS 步骤条/内置区块',
  component: ElSteps,
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
  name: '基础示例',
  render: () => ({
    template: `
      <el-steps>
        <el-step>
          <template #title><el-text text="步骤一"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤二"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤三"></el-text></template>
        </el-step>
      </el-steps>
    `,
  }),
};

export const Vertical = {
  name: '垂直',
  render: () => ({
    template: `
      <el-steps direction="vertical">
        <el-step>
          <template #title><el-text text="步骤一"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤二"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤三"></el-text></template>
        </el-step>
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

export const Simple = {
  name: '简洁风格',
  render: () => ({
    template: `
      <el-steps simple>
        <el-step>
          <template #title><el-text text="步骤一"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤二"></el-text></template>
        </el-step>
        <el-step>
          <template #title><el-text text="步骤三"></el-text></template>
        </el-step>
      </el-steps>
    `,
  }),
};
