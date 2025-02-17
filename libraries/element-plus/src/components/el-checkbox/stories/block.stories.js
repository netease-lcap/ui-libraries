import Components from '../index';

export default {
  id: 'el-checkbox-blocks',
  title: '组件列表/checkbox 选择框/内置区块',
  component: Components,
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
    template: `
    <el-checkbox-group>
      <el-checkbox label="选项1" value="1" >
        <el-text text="选项1" />
      </el-checkbox>
      <el-checkbox label="选项2" value="2" >
        <el-text text="选项2" />
      </el-checkbox>
      <el-checkbox label="选项3" value="3" >
        <el-text text="选项3" />
      </el-checkbox>
    </el-checkbox-group>
    `,
  }),
};
