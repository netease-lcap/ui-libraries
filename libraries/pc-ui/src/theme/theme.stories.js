import ComponentPreivew, { demos } from 'virtual:lcap-theme-component-previews.js';
import Dashboard from './previews/dashboard.vue';
import Form from './previews/form.vue';

export default {
  title: '主题配置预览',
  parameters: {
    // layout: 'fullscreen',
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'twitter',
          value: '#f5f5f5',
        },
      ],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

export const Home = {
  name: '首页',
  render: () => ({
    components: {
      Dashboard,
    },
    template: '<Dashboard />',
  }),
};

export const FormPreview = {
  name: '表单页',
  render: () => ({
    components: {
      Form,
    },
    template: '<Form />',
  }),
};

export const Components = {
  name: '组件预览',
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: {
        ComponentPreivew,
      },
      template: '<ComponentPreivew v-bind="$props" />',
    };
  },
  args: {
    componentNames: ['u-button', 'u-panel'],
  },
  argTypes: {
    componentNames: {
      options: demos.map((c) => c.name),
      control: { type: 'multi-select' }, // Automatically inferred when 'options' is defined
    },
  },
};
