import ElSelectInputPro from '../index';

export default {
  id: 'el-select-input-pro-blocks',
  title: '组件列表/SelectInput 筛选器输入框/内置区块',
  component: ElSelectInputPro,
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
    template: '<el-select-input-pro></el-select-input-pro>',
  }),
};
