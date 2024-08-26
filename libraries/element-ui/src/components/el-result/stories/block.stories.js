import ElResult from '../index';

export default {
  id: 'el-result-blocks',
  title: '组件列表/RESULT 结果/内置区块',
  component: ElResult,
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
    template: `<el-result icon="success">
      <template slot="title">
        <el-text text="成功提示"></el-text>
      </template>
      <template slot="subTitle">
        <el-text text="请根据提示进行操作"></el-text>
      </template>
      <template slot="extra">
        <el-button type="primary" size="medium" text="返回"></el-button>
      </template>
    </el-result>`,
  }),
};
