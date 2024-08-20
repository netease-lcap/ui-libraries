import ElSwitchPro from '../index';

export default {
  id: 'el-switch-pro-examples',
  title: '组件列表/Switch 开关/示例',
  component: ElSwitchPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-switch-pro></el-switch-pro>',
  }),
};
