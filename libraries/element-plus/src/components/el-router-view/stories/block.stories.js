import Vue from 'vue';
import ElRouterView from '../index';

Vue.component('router-view', {
  functional: true,
  render(h) {
    return null;
  },
});

export default {
  id: 'el-router-view-blocks',
  title: '组件列表/Router View 子页面容器/内置区块',
  component: ElRouterView,
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
    template: '<el-router-view></el-router-view>',
  }),
};
