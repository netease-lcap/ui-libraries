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
        startTime: null,
        endTime: null,
      };
    },
    methods: {
      change() {
        // this.$refs.form.setFormData({
        //   name: '哈哈哈哈',
        //   password: {
        //     xx: '23333',
        //   },
        // });

        // this.startTime = new Date().toJSON();
        // this.endTime = new Date().toJSON();
        this.$refs.form.resetForm();
      },
    },
    template: `<div><el-form-pro ref="form" labelAlign="right" labelWidth="300px" :colon="true" :requiredMark="true" resetType="initial">
      <el-form-item-pro name="username" initialValue="1232322">
        <template #label>姓名姓名姓名姓名姓名</template>
        <el-input-pro style="width: 400px" placeholder="请输入姓名" :value.sync="syncValue"></el-input-pro>
      </el-form-item-pro>
      <el-form-item-pro colSpan="2" label="初始密码初始密码初始密码初始密码初始密码" :labelEllipsis="!ellipsis" name="password">
        <el-form-item-pro name="xx">
          <el-input-pro type="password" placeholder="请输入初始密码"></el-input-pro>
        </el-form-item-pro>
      </el-form-item-pro>
      <el-form-item-pro colSpan="2" label="初始密码初始密码初始密码初始密码初始密码" :labelEllipsis="!ellipsis">
        <el-form-item-pro>
          <el-input-pro type="password" placeholder="请输入初始密码"></el-input-pro>
        </el-form-item-pro>
      </el-form-item-pro>
       <el-form-item-pro colSpan="2" :useRangeValue="true" startFieldName="startTime" endFieldName="endTime" label="时间区间">
        <el-date-time-picker-pro :startValue.sync="startTime" :endValue.sync="endTime" :range="true" ></el-date-time-picker-pro>
       </el-form-item-pro>
        <el-form-item-pro>
        <el-checkbox-group-pro :max="2">
            <el-checkbox-pro key="2" value="1">选项一</el-checkbox-pro>
            <el-checkbox-pro key="3" value="2">选项二</el-checkbox-pro>
            <el-checkbox-pro key="4" value="3">选项三</el-checkbox-pro>
            <el-checkbox-pro key="5" value="4" :disabled="true">选项四</el-checkbox-pro>
        </el-checkbox-group-pro>
        </el-form-item-pro>

    </el-form-pro>
    <button @click="change">哈哈</button></div>`,
  }),
};
