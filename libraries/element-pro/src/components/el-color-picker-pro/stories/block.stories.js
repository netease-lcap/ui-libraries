import ElColorPickerPro from '../index';

export default {
  id: 'el-color-picker-pro-blocks',
  title: '组件列表/ColorPicker 颜色选择器/内置区块',
  component: ElColorPickerPro,
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
    template: '<el-color-picker-pro></el-color-picker-pro>',
  }),
};
