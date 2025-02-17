<script setup>
import { ref, onMounted } from 'vue';

const formData = ref({
  layout: 'vertical',
  fail: '',
  warning: '',
  success: ''
});

const rules = ref({
  fail: [{ required: true, message: '必填', type: 'error' }],
  warning: [{ required: true, message: '必填', type: 'warning' }],
  success: [{ validator: () => true }],
});

const formValidatorStatus = ref(null);

onMounted(() => {
    formValidatorStatus.value.validate();
});
</script>

<template>
  <div>
    <el-form :requiredMark="false" :data="formData" :rules="rules" :statusIcon="true" :colon="true"
      :layout="formData.layout" ref="formValidatorStatus">
      <el-form-item requiredMark="show" label="失败" name="fail" help="这里是一段帮助文本">
        <el-input v-model="formData.fail" placeholder="校验不通过状态"></el-input>
      </el-form-item>
      <el-form-item requiredMark="show" label="警告" name="warning">
        <el-input v-model="formData.warning" placeholder="校验警告状态"></el-input>
      </el-form-item>
      <el-form-item label="成功" name="success" successBorder>
        <el-input v-model="formData.success" placeholder="带绿色边框的成功状态"></el-input>
      </el-form-item>

      <el-form-item layout="center" label=" " class="preview-hidden-colon">
        <el-button type="primary" text="立即创建"></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>