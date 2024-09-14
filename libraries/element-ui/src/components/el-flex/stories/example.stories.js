import Component from '../index';

export default {
  id: 'el-flex-examples',
  title: '组件列表/Flex 线性布局/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    methods: {
      handleClick(c) {
        console.log('click');
      },
    },
    template: `
      <el-flex v-bind="$props" @click="handleClick">
        <div style="min-width: 100px; height: 64px;background-color:#000"></div>
        <div style="min-width: 100px; height: 64px;background-color:#000"></div>
        <div style="min-width: 100px; height: 64px;background-color:#000"></div>
      </el-flex>
    `,
  }),
  args: {
    gutter: 10,
    direction: 'vertical',
    loading: false,
    loadingText: '拼命加载中',
  },
};

export const Demo1 = {
  name: '块级-横向排列',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    methods: {
      handleClick(c) {
        console.log('click');
      },
    },
    template: `
      <el-flex mode="block">
        <el-button>测试1</el-button>
        <el-button>测试1</el-button>
        <el-button>测试1</el-button>
      </el-flex>
    `,
  }),
};

export const Demo2 = {
  name: '块级-纵向排列',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    methods: {
      handleClick(c) {
        console.log('click');
      },
    },
    template: `
      <el-flex mode="block" direction="vertical">
        <div style="min-width: 100px; height: 64px;background-color:#ddd"></div>
        <div style="min-width: 100px; height: 64px;background-color:#ddd"></div>
        <div style="min-width: 100px; height: 64px;background-color:#ddd"></div>
      </el-flex>
    `,
  }),
};
