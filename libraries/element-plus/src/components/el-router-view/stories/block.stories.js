import ElRouterView from '../index';

export default {
  id: 'el-router-view-blocks',
  title: '组件列表/Router View 子页面容器/内置区块',
  component: ElRouterView,
  parameters: {
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
    template: '<el-router-view></el-router-view>',
  }),
};
