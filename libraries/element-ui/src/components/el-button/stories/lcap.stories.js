import Component from '../index';

export default {
  id: 'el-button-lcap-exmaples',
  title: '组件列表/Button 按钮/扩展示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: { control: 'radio', options: ['primary', 'success', 'warning', 'danger', 'info', 'text', ''] },
    size: { control: 'radio', options: ['medium', 'small', 'mini', ''] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
  },
};

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      ElButton: Component,
    },
    data() {
      return {
        loading: false,
        plugin: {},
      };
    },
    methods: {
      handleClick(c) {
        // this.plugin = plugin;
        this.$refs.button.startLoading();

        setTimeout(() => {
          this.$refs.button.closeLoading();
        }, 3000);
      },
    },
    template: '<el-button v-bind="$props" :plugin="plugin" class="test233" ref="button" @click="handleClick"></el-button>',
  }),
  args: {
    round: true,
    circle: false,
    type: '',
    text: 'Hello world',
    tooltip: '',
    icon: 'ri-donut-chart-fill',
    iconPosition: 'left',
    size: 'small',
  },
};
