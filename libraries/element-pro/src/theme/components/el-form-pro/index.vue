<template>
  <div>
    <el-radio-group-pro v-model="formData.layout" style="margin: 0 0 20px 30px">
      <el-radio-pro value="vertical">纵向布局</el-radio-pro>
      <el-radio-pro value="inline">行内布局</el-radio-pro>
    </el-radio-group-pro>
    <el-form-pro :requiredMark="false" :data="formData" :rules="rules" :statusIcon="true" :colon="true"
      :layout="formData.layout" ref="formValidatorStatus">
      <el-form-item-pro requiredMark="show" label="失败" name="fail" help="这里是一段帮助文本">
        <el-input-pro v-model="formData.fail" placeholder="校验不通过状态"></el-input-pro>
      </el-form-item-pro>
      <el-form-item-pro requiredMark="show" label="警告" name="warning">
        <el-input-pro v-model="formData.warning" placeholder="校验警告状态"></el-input-pro>
      </el-form-item-pro>
      <el-form-item-pro label="成功" name="success" successBorder>
        <el-input-pro v-model="formData.success" placeholder="带绿色边框的成功状态"></el-input-pro>
      </el-form-item-pro>

      <el-form-item-pro layout="center" label=" " class="preview-hidden-colon">
        <el-button type="primary" text="立即创建"></el-button>
      </el-form-item-pro>
    </el-form-pro>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fail: '',
        warning: '',
        success: '',
        layout: 'vertical',
        add: '',
      },
      rules: {
        fail: [{ required: true, message: '必填', type: 'error' }],
        warning: [{ required: true, message: '必填', type: 'warning' }],
        success: [{ validator: () => true }],
      },
      addlist: [{ id: 0, name: 'add0' }],
      lastAddItem: 1,
    };
  },
  mounted() {
    this.$refs.formValidatorStatus.validate();
  },
}
</script>
<style>
.preview-hidden-colon .el-p-form__label--colon label::after{
  content: ''
}
</style>