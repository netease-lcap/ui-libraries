import ElIcon from '../index';

export default {
  id: 'el-icon-blocks',
  title: '组件列表/Icon 图标/内置区块',
  component: ElIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [() => ({
    provide() {
      return {
        VUE_APP_DESIGNER: true,
      };
    },
    template: '<div style="width: 500px;"><story/></div>',
  })],
};

export const Default = {
  name: '默认示例',
  render: () => ({
    template: '<el-icon name="picture-outline"></el-icon>',
  }),
};
