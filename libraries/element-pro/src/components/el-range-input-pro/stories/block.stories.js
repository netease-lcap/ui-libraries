import ElRangeInputPro from '../index';

export default {
  id: 'el-range-input-pro-blocks',
  title: '组件列表/RangeInput 范围输入框/内置区块',
  component: ElRangeInputPro,
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
    template: '<el-range-input-pro></el-range-input-pro>',
  }),
};
