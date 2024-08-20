import ElTransferPro from '../index';

export default {
  id: 'el-transfer-pro-examples',
  title: '组件列表/Transfer 穿梭框/示例',
  component: ElTransferPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-transfer-pro></el-transfer-pro>',
  }),
};
