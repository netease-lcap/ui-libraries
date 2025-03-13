import Component from '../index';

export default {
  id: 'el-backtop-examples',
  title: '组件列表/Backtop 回到顶部/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    target: {
      control: 'text',
    },
    visibilityHeight: {
      control: 'number',
    },
    right: {
      control: 'number',
    },
    bottom: {
      control: 'number',
    },
  },
};

export const Primary = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<div>
      <div style="height: 2000px;"></div>
      <el-backtop v-bind="$props"></el-backtop>
    </div>`,
  }),
};

export const Target = {
  name: '自定义target',
  render: () => ({
    template: `<div>
    <div style="position: relative; height: 280px;" >
      <div class="aaa" style="height: 100%; overflow-y: scroll;">
        <div style="height: 3000px; background-color: aqua;">
          内容区域
        </div>
      </div>
      <el-backtop target=".aaa" style="position: absolute"></el-backtop>
    </div>
  </div>`,
  }),
};
