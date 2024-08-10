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
'bar-chart',
'bar-chart-horizontal',
'bar-chart-2',
'bar-chart-box',
'bar-chart-grouped',
'bubble-chart',
'pie-chart',
'pie-chart-2',
'pie-chart-box',
'donut-chart',
];

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
      return {
        iconData,
      }
    },
    methods: {
      handleClick(c) {
        console.log('click');
      },
    },
    template: `
      <div style="font-size:24px; color: red;display:flex; gap: 16px;">
        <el-icon v-for="icon in iconData" :name="\`ri-\${icon}-fill\`" />
      </div>
    `,
  }),
  args: {
    gutter: 10,
    direction: 'vertical'
  }
};
