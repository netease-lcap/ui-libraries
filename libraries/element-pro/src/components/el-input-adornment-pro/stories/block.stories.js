import ElInputAdornmentPro from '../index';

export default {
  id: 'el-input-adornment-pro-blocks',
  title: '组件列表/InputAdornment 输入装饰器/内置区块',
  component: ElInputAdornmentPro,
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
    template: '<el-input-adornment-pro></el-input-adornment-pro>',
  }),
};
