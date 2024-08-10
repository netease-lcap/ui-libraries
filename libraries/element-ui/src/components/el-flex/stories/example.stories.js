import Component from '../index';

export default {
  id: 'el-flex-examples',
  title: '组件列表/el-flex/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] }
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
    direction: 'vertical'
  }
};
