import ElFlex from '../index';

export default {
  id: 'el-flex-blocks',
  title: '组件列表/Flex 线性布局/内置区块',
  component: ElFlex,
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
  name: '单行排布',
  render: () => ({
    template: '<el-flex direction="horizontal" mode="block"></el-flex>',
  }),
};

export const MultiLine = {
  name: '多行排布',
  render: () => ({
    template: `<el-flex direction="vertical" mode="block">
    <el-flex direction="horizontal" mode="block">
    </el-flex>
    <el-flex direction="horizontal" mode="block">
    </el-flex>
    </el-flex>`,
  }),
};

export const SpaceBetween = {
  name: '两端排布',
  render: () => ({
    template: '<el-flex justify="space-between"><el-flex :wrap="true"></el-flex><el-flex :wrap="true"></el-flex></el-flex>',
  }),
};
