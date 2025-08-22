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
  name: '组合图标-上下',
  render: () => ({
    template: '<el-icon name="picture-outline" icotype="top"><el-text text="图标"></el-text></el-icon>',
  }),
};

export const Default2 = {
  name: '组合图标-左右',
  render: () => ({
    template: '<el-icon name="picture-outline" icotype="left"><el-text text="图标"></el-text></el-icon>',
  }),
};


export const Default3 = {
  name: '仅图标',
  render: () => ({
    template: '<el-icon name="picture-outline" icotype="only"><el-text text="图标"></el-text></el-icon>',
  }),
};
