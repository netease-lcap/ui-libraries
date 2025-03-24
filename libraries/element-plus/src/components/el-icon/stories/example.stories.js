import Component from '../index';

export default {
  id: 'el-icon-examples',
  title: '组件列表/Icon 图标/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
};
const iconData = [
  'School',
  'ChatSquare',
];

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
      return {
        iconData,
      };
    },
    template: `
      <div style="font-size:24px; color: red;display:flex; gap: 16px;">
        <el-icon v-for="icon in iconData" :name="\`\${icon}\`" />
      </div>
    `,
  }),
  args: {
    gutter: 10,
    direction: 'vertical',
  },
};
