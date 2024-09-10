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

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-card>
      <template #header>
          <el-text>卡片标题</el-text>
      </template>
    </el-card>`,
  }),
};
