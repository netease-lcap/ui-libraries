import ElSwitch from '../index';

export default {
  id: 'el-switch-blocks',
  title: '组件列表/SWITCH 开关/内置区块',
  component: ElSwitch,
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
    template: '<el-switch></el-switch>',
  }),
};
