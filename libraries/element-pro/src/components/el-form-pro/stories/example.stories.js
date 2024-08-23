import ElFormPro from '../index';

export default {
  id: 'el-form-pro-examples',
  title: '组件列表/Form 表单/示例',
  component: ElFormPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    data() {
      return {
        formData: {},
      };
    },
    template: `<el-form-pro>
      <el-form-item-pro name="name">
        <template #label>姓名</template>
        <el-input-pro v-model="formData.name" placeholder="请输入姓名"></el-input-pro>
      </el-form-item-pro>
      <el-form-item-pro label="初始密码" name="password">
        <el-input-pro v-model="formData.password" type="password" placeholder="请输入初始密码"></el-input-pro>
      </el-form-item-pro>
    </el-form-pro>`,
  }),
};
