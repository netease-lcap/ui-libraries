import ElCard from '../index';

export default {
  id: 'el-card-blocks',
  title: '组件列表/CARD 卡片/内置区块',
  component: ElCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Demo0 = {
  name: '基本样式',
  render: () => ({
    template: `<el-card>
    <template #header>
      <el-text text="卡片"></el-text>
    </template>
    <el-text text="卡片内容"></el-text>
  </el-card>`,
  }),
};

export const Demo1 = {
  name: '简单卡片',
  render: () => ({
    template: `<el-card>
    <el-text text="卡片内容"></el-text>
  </el-card>`,
  }),
};

export const Demo2 = {
  name: '带图片样式',
  render: () => ({
    template: `<el-card style="width: 280px">
    <template #header>
      <el-text text="卡片"></el-text>
    </template>
    <el-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"></el-image>
  </el-card>`,
  }),
};
