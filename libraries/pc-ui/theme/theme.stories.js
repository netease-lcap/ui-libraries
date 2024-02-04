import Vue from 'vue';
import * as CloudUI from '@/index.js';
import ThemeDashboard from './dashboard.vue';
import ThemeForm from './form.vue';

Vue.use(CloudUI);

export default {
  title: '主题设置/全局主题配置',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Dashboard = {
  name: 'Dashboard',
  render: () => ({
    components: {
      ThemeDashboard,
    },
    template: '<theme-dashboard />',
  }),
};

export const Form = {
  name: '表单页',
  render: () => ({
    components: {
      ThemeForm,
    },
    template: '<theme-form />',
  }),
};
