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
        ellipsis: false,
        formData: {},
        syncValue: '嘿嘿嘿',
      };
    },
    methods: {
      change() {
        this.$refs.form.setFormData({
          name: '哈哈哈哈',
          password: {
            xx: '23333',
          },
        });

        // this.$refs.form.setFieldValue('name', '哈哈哈');
        // this.syncValue = 'heheheheh';
      },
    },
    template: `<div><el-form-pro ref="form">
      <el-form-item-pro name="name">
        <template #label>姓名姓名姓名姓名姓名</template>
        <el-input-pro placeholder="请输入姓名" :value.sync="syncValue"></el-input-pro>
      </el-form-item-pro>
      <el-form-item-pro colSpan="2" label="初始密码初始密码初始密码初始密码初始密码" :labelEllipsis="!ellipsis" name="password">
        <el-form-item-pro name="xx">
          <el-input-pro type="password" value="123" placeholder="请输入初始密码"></el-input-pro>
        </el-form-item-pro>
      </el-form-item-pro>
      <el-form-item-pro colSpan="2" label="初始密码初始密码初始密码初始密码初始密码" :labelEllipsis="!ellipsis">
        <el-form-item-pro>
          <el-input-pro type="password" placeholder="请输入初始密码"></el-input-pro>
        </el-form-item-pro>
      </el-form-item-pro>
       <el-form-item-pro colSpan="2" :useRangeValue="true" startFieldName="startTime" endFieldName="endTime" label="时间区间">
        <el-date-time-picker-pro :range="true" ></el-date-time-picker-pro>
       </el-form-item-pro>
    </el-form-pro>
    <button @click="change">哈哈</button></div>`,
  }),
};
