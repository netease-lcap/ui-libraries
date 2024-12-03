import ElFormPro from '../index';

export default {
  id: 'el-form-pro-blocks',
  title: 'Pro组件列表/Form 表单/内置区块',
  component: ElFormPro,
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
      template: '<div><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-form-pro :requiredMark="false">
      <el-form-input-pro requiredMark="show" placeholder="由字母、数字和中划线组成">
        <template #label><el-text text="名称"></el-text></template>
      </el-form-input-pro>
      <el-form-radio-group-pro  requiredMark="show">
        <template #label><el-text text="类型"></el-text></template>
        <el-radio-pro value="A"><el-text text="类型 A"></el-text></el-radio-pro>
        <el-radio-pro value="B"><el-text text="类型 B"></el-text></el-radio-pro>
      </el-form-radio-group-pro>
      <el-form-item-pro label=" ">
          <el-button type="primary" text="立即创建"></el-button>
      </el-form-item-pro>
    </el-form-pro>`,
  }),
};

export const Inline = {
  name: '行内表单',
  render: () => ({
    template: `<el-form-pro :requiredMark="false" layout="inline">
      <el-form-input-pro requiredMark="show" placeholder="由字母、数字和中划线组成">
        <template #label><el-text text="名称"></el-text></template>
      </el-form-input-pro>
      <el-form-radio-group-pro  requiredMark="show">
        <template #label><el-text text="类型"></el-text></template>
        <el-radio-pro value="A"><el-text text="类型 A"></el-text></el-radio-pro>
        <el-radio-pro value="B"><el-text text="类型 B"></el-text></el-radio-pro>
      </el-form-radio-group-pro>
      <el-form-item-pro label=" ">
          <el-button type="primary" text="立即创建"></el-button>
      </el-form-item-pro>
    </el-form-pro>`,
  }),
};
