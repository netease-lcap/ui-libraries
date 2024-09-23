import ElForm from '../index';

export default {
  id: 'el-form-blocks',
  title: '组件列表/FORM 表单/内置区块',
  component: ElForm,
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
    template: ` <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>`,
  }),
};
