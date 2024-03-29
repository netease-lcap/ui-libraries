import '__demo-entry__';
import ThemeHome from './home.vue';
import ThemeForm from './form.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: '主题设置/全局主题配置',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Home = {
  name: '首页',
  render: () => ({
    components: {
      ThemeHome,
    },
    template: '<theme-home />',
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
